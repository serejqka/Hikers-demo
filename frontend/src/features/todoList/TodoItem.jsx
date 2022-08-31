import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Trash2 from '@geist-ui/icons/trash2';
import { useDispatch } from 'react-redux';
import { deleteTask, putDoneTask } from './todoSlice';

function TodoItem({ task }) {
  const dispatch = useDispatch();

  const handleDeleteTask = () => dispatch(deleteTask(task));

  const handleDoneChange = (event) => {
    const done = event.target.checked;
    const taskObj = { ...task, done };
    dispatch(putDoneTask(taskObj));
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Checkbox checked={task.done} onChange={handleDoneChange} aria-label="Checkbox for following text input" />
      <Form.Control
        disabled
        defaultValue={task.task}
        aria-label="Text input with checkbox"
      />
      <Button onClick={handleDeleteTask} variant="outline-secondary" id="button-addon2">
        <Trash2 />
      </Button>
    </InputGroup>
  );
}

export default TodoItem;
