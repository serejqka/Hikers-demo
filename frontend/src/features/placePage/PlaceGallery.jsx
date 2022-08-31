import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorPlaces } from '../Category/placesSlice';

function PlaceGallery() {
  const { id, placeid } = useParams();
  const arrPlaces = useSelector(selectorPlaces);
  const place = arrPlaces && arrPlaces.find((el) => el.id === Number(placeid));

  return (
    <Carousel fade interval={2000}>
      {place && place.Photos.map((el) => (
        <Carousel.Item key={uuidv4()}>
          <img
            className="d-block carousel-img"
            src={el}
            alt="slide"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default PlaceGallery;
