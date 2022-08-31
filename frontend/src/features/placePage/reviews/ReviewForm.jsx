import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Grid, Rating, Text } from '@geist-ui/core';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto, addReview, selectPhoto } from './reviewSlice';

function ReviewForm() {
  const [state, setState] = useState(false);
  const [value, setValue] = useState(1);
  const handler = () => setState(true);
  const closeHandler = (event) => {
    setState(false);
  };
  const { id, placeid } = useParams();
  const dispatch = useDispatch();

  const photo = useSelector(selectPhoto);

  const sendFiles = async (e) => {
    try {
      const picturesData = [...e.target.files];
      const data = new FormData();
      picturesData.forEach((img) => {
        data.append('homesImg', img);
      });
      dispatch(addPhoto(data));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const placeId = Number(placeid);
    const form = event.target;
    const valueForm = {
      title: form.title.value,
      description: form.description.value,
      date: form.date.value,
      photo,
      rating: value,
      placeId,
    };
    dispatch(addReview(valueForm));
    setState(false);
  };

  return (
    <>
      <Button id="reviewBtn" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)' }} onClick={handler}>Добавить свой отзыв о месте</Button>
      <Modal visible={state} onClose={closeHandler}>
        <Text h5>Добавить свой отзыв о месте</Text>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Краткий отзыв:</Form.Label>
              <Form.Control required type="text" name="title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Развернутый отзыв:</Form.Label>
              <Form.Control required as="textarea" name="description" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Дата вашей поездки:</Form.Label>
              <Form.Control required type="date" name="date" />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Прикрепить фото:</Form.Label>
              <Form.Control type="file" name="photos" multiple onChange={sendFiles} autoComplete="off" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ваша оценка:</Form.Label>
              <Grid xs={24} sm={12} md={8} justify="center"><Rating type="warning" value={value} onValueChange={setValue} /></Grid>
            </Form.Group>
            <div id="modalBtns">
              <Button type="error" ghost onClick={() => setState(false)}>Отмена</Button>
              <Button htmlType="submit">Отправить</Button>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ReviewForm;
