/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Text, Divider, Button } from '@geist-ui/core';
import { v4 as uuidv4 } from 'uuid';
import './category.css';

export default function Place({ place, placeID }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log('place', place);

  return (
    <Card className="cardPlace" id="cardPlace" onClick={() => navigate(`/categories/${id}/places/${placeID}`)}>
      <div className="topBlock">
        <img src={place.Photos[0]} className="imgTop" alt="" />
        <p>{place.title}</p>

        {place.rating ? Array.from({ length: place && place.rating }, (_, i) => <img key={uuidv4()} src="/images/icon/star.png" style={{ maxWidth: 30 }} alt="" />) : <p>У места нет отзывов</p>}
      </div>
      <div className="bottomBlock" />
    </Card>
  );
}
