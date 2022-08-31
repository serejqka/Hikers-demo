export default async function initMap(place) {
  const placeGeo = await window.ymaps.geocode(place.geo);
  // console.log('координаты из бд', place.geo);
  // console.log('координаты', placeGeo);
  const coord = place.geo.split(',').map((el) => Number(el));
  const center = [coord[0], coord[1] + 2];
  // console.log('center', center);
  // console.log('center2', '[52.935405052110895,89.50648133774354]');

  // добавляем карту на сайт
  const myMap = new window.ymaps.Map('placeMap', {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    center,
    // Уровень масштабирования.
    zoom: 8
  }, {
    suppressMapOpenBlock: true
  });

  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  myMap.controls.remove('searchControl'); // удаляем поиск

    // console.log('check geo');
    // координаты объекта
    const coordinates = placeGeo.geoObjects.get(0).geometry.getCoordinates();
    // console.log('координаты', coordinates);
    // Добавление метки (Placemark) на карту
    const placemark = new window.ymaps.Placemark(coordinates, {
      hintContent: `${place.title}`,
    }, {
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: `/images/icon/${place.category_id}.png`,
      iconImageSize: [30, 30],
      iconImageOffset: [0, 0]
    });
    myMap.geoObjects.add(placemark);
}
