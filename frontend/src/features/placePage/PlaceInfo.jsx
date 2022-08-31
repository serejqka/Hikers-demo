/* eslint-disable consistent-return */
/* eslint-disable no-bitwise */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Text, Divider, Drawer, Button } from '@geist-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { selectorUserSession } from '../main/authSlice';
import './PlacePage.css';
// eslint-disable-next-line import/extensions
import Weather from '../weather/Weather.jsx';
import { placeThunk, selectorPlaces } from '../Category/placesSlice';
import { addFavPlaceThunk, selectorFavourites, favouritesThunk } from '../Favourites/favouritesSlice';
import initMap from './placeMapApi';
import { deleteCardThunk, openUpdateCard, selectorUpdateCard, selectorUpdateCardBack, selectorUpdateStatus } from '../profile/cardSlice';
import EditCard from './updatecard/EditCard';

function PlaceInfo() {
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectorUserSession);
  const arrPlaces = useSelector(selectorPlaces);
  const favPlace = useSelector(selectorFavourites);

  const editCard = useSelector(selectorUpdateCard);
  const editStatus = useSelector(selectorUpdateStatus);
  const udateCard = useSelector(selectorUpdateCardBack);

  const { id, placeid } = useParams();

  let place;
  if (!editStatus) {
    place = arrPlaces && arrPlaces.find((el) => el.id === Number(placeid));
  }

  let checkFavPlace;
  if (user) {
    if (favPlace) {
      checkFavPlace = favPlace.find((el) => el.place_id === Number(placeid));
    }
  }

  function handleFavourite() {
    dispatch(addFavPlaceThunk(placeid));
  }

  useEffect(() => {
    console.log('edit', editStatus);
    if (editStatus && udateCard) {
      console.log('udateCard', udateCard);
      place = udateCard;
    console.log('update', place);
    }
  }, [editStatus, udateCard]);
  console.log(udateCard);

  useEffect(() => {
    dispatch(placeThunk(id));
    if (user) {
      dispatch(favouritesThunk());
    }
  }, [dispatch, id, user]);

  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  useEffect(() => {
    dispatch(placeThunk(id, placeid));
    async function winFunc(num) {
      await window.ymaps.ready(initMap(num));
    }
    if (place) {
      // winFunc(place);
      setTimeout(() => {
        const daddy = document.querySelector('#placeMap').closest('.info-container');
        document.querySelector('#placeMap').remove();
        const newMap = document.createElement('div');
        newMap.id = 'placeMap';
        newMap.style.width = '100%';
        newMap.style.height = '550px';
        newMap.style.border = 'solid 1px grey';
        newMap.style.borderRadius = 8;
        daddy.insertAdjacentElement('afterBegin', newMap);
        winFunc(place);
      }, 1000);
    }
  }, [dispatch, id, placeid, place === undefined]);

  if (!place) return <div>load</div>;

  return (
    <div className="info-container" style={{ position: 'relative' }}>
      <div id="placeMap" style={{ width: '100%', height: 550, border: 'solid 1px grey', borderRadius: 8 }} />
      <Card style={{ position: 'absolute', right: 50, top: 5, boxShadow: '0 0 10px rgba(0,0,0,0.5)' }} width="600px">
        <Card.Content style={{ position: 'relative' }}>
          <Text b my={0}>{place && place.title}</Text>
          {user && user.admin && (
            <Button
              style={{ position: 'absolute', backgroundColor: '#f6cfd6', textTransform: 'none', right: '20px', bottom: '8px' }}
              onClick={() => {
                  dispatch(deleteCardThunk(place.id));
                  navigate('/');
                }}
            > Скрыть
            </Button>
        )}
        </Card.Content>
        <Divider h="1px" my={0} />
        <Card.Content>
          {place && place.description.split('\n').map((el) => <Text key={uuidv4()}>{el}<br /></Text>)}
        </Card.Content>
        <Card.Footer id="rating">
          <div>
            {Array.from({ length: place && place.rating }, (_, i) => <img key={uuidv4()} src="/images/icon/star.png" style={{ maxWidth: 40 }} alt="" />)}
          </div>
          <Button auto onClick={() => setState(true)} mr="10px">Погода</Button>
          <Drawer visible={state} onClose={() => setState(false)} placement="top">
            <Weather geo={place && place.geo} />
          </Drawer>
          {user && (checkFavPlace ? (
            // eslint-disable-next-line react/jsx-indent
            <Button
              disabled
              style={{ textTransform: 'none' }}
            >
              Уже в избранном
            </Button>
          ) : (
            <Button
              onClick={handleFavourite}
              style={{ textTransform: 'none' }}
            > В избранное
            </Button>
          ))}
        </Card.Footer>
      </Card>
      {/* {editCard && <EditCard place={place} />} */}
    </div>
  );
}

export default PlaceInfo;
