import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Plus from '@geist-ui/icons/plus';
import { useDispatch } from 'react-redux';
import { addTask } from './todoSlice';

function TodoForm({ placeId }) {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleNewTask = (event) => setTask(event.target.value);
  const handleAddTask = () => {
    dispatch(addTask({ placeId, task }));
    setTask('');
  };

  return (
    <InputGroup className="mb-3">
      <Form.Control
        value={task}
        onChange={handleNewTask}
        placeholder="Что-то очень нужное"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <Button onClick={handleAddTask} variant="outline-secondary" id="button-addon2">
        <Plus />
      </Button>
    </InputGroup>
  );
}

export default TodoForm;
