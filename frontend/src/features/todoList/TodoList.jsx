import React, { useState, useEffect } from 'react';
import { Modal, Spacer } from '@geist-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { loadTasks, selectTasks } from './todoSlice';

function TodoList({ place }) {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks(place.place_id));
  }, [dispatch, place.place_id]);

  const tasks = useSelector(selectTasks);

  const handler = () => setState(true);
  const closeHandler = () => {
    setState(false);
  };

  return (
    <>
      <Button className="favPlaceBtn" variant="outline-success" onClick={handler}>Собраться</Button>
      <Modal visible={state} onClose={closeHandler}>
        <Modal.Title>
          <img src={`/images/icon/${place['Place.category_id']}.png`} alt="icon" style={{ maxWidth: 25 }} />
          <Spacer w={1} />{place['Place.title']}<Spacer w={1} />
          <img src={`/images/icon/${place['Place.category_id']}.png`} alt="icon" style={{ maxWidth: 25 }} />
        </Modal.Title>
        <br />
        <Modal.Subtitle>Взять с собой:</Modal.Subtitle>
        <Modal.Content>
          <TodoForm placeId={place.place_id} />
          {tasks && tasks
          .filter((el) => el.place_id === place.place_id)
          .map((task) => <TodoItem key={task.id} task={task} />)}
        </Modal.Content>
        <Modal.Action passive onClick={() => setState(false)}>Закрыть</Modal.Action>
      </Modal>
    </>
  );
}

export default TodoList;
