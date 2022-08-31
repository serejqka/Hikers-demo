export default async function init() {
  // добавляем карту на сайт
  const myMap = new window.ymaps.Map('map', {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    center: [53.46375510022058, 92.04012278515626],
    // Уровень масштабирования.
    zoom: 3
  }, {
    suppressMapOpenBlock: true
  });

  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  myMap.controls.remove('searchControl'); // удаляем поиск

  // получаем места из базы данных
  const {
    id
  } = document.querySelector('.category');

  const response = await fetch(`/api/places/${id}`);

  const placesDB = await response.json();

  // console.log('apiMap', placesDB);

  const geocoder = [];
  placesDB.forEach((place, i) => {
    geocoder[i] = [];
    geocoder[i].push(window.ymaps.geocode(place.geo));
    geocoder[i].push(place.title);
    geocoder[i].push(place.description);
    geocoder[i].push(place.id);
    geocoder[i].push(place.Photos);
    geocoder[i].push(place.rating);
    geocoder[i].push(place.category_id);
  });

  let count = 0;

  // console.log('YandexGeocoder', geocoder);

  geocoder.forEach((geo) => {
    geo[0].then((res) => {
      // console.log(` check ${geo[5]}`);
      // координаты объекта
      const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
      // console.log('координаты', coordinates);
      // Добавление метки (Placemark) на карту
      const placemark = new window.ymaps.Placemark(coordinates, {
        hintContent: `${geo[1]}`,
        // balloonContentHeader: `<img src=${geo[4][0]} id="yandexImage">`,
        // balloonContentBody: `<span class="yandexPlaceTitle">${geo[1]}</span><br>
        // <span class="yandexStar">${'★'.repeat(geo[5])}</span><br>
        // <button class="yandexButton"><a href = '/categories/${geo[6]}/places/${geo[3]}'
        // class="yandexTitle">
        // Подробнее</a></button>`
        // balloonContentHeader:
        balloonContentBody: `<div className="modal">
          <div>
            <img src=${geo[4][0]} id="yandexImage">
          </div>
          <div>
              <span className="yandexPlaceTitle" id="yandexPlaceTitle">${geo[1]}</span><br>
              <span class="yandexStar">${'★'.repeat(geo[5])}</span><br>
              <button class="yandexButton"><a href = '/categories/${geo[6]}/places/${geo[3]}' class="yandexTitle">Подробнее</a></button>
          </div>
        </div>`
      }, {
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: `/images/icon/${geo[6]}.png`,
        iconImageSize: [30, 30],
        iconImageOffset: [0, 0]
      });
      myMap.geoObjects.add(placemark);
      count += 1;
    });
  });
}
