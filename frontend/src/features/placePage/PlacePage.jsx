import React from 'react';
import { Page, Divider } from '@geist-ui/core';
import PlaceInfo from './PlaceInfo';
import PlaceGallery from './PlaceGallery';
import ReviewList from './reviews/ReviewList';

function PlacePage() {
  return (
    <Page>
      <PlaceInfo />
      <Divider id="reviewTitle" h={5}>Галерея</Divider>
      <PlaceGallery />
      <Divider id="reviewTitle" h={5}>Отзывы</Divider>
      <ReviewList />
    </Page>
  );
}

export default PlacePage;
