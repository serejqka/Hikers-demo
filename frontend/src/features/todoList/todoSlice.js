import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tasks: []
};

// экспорт санок для загрузки списка задач
export const loadTasks = createAsyncThunk(
  'todo/loadTasks',
  async (placeId) => {
    const response = await fetch(`/api/place/${placeId}/tasks`);
    const data = await response.json();
    return data;
  }
);

// экспорт санок для добавления новой задачи
export const addTask = createAsyncThunk(
  'todo/addTask',
  async (taskObj) => {
    const { placeId } = taskObj;
    const response = await fetch(`/api/place/${placeId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        taskObj
      })
    });
    const data = await response.json();
    return data;
  }
);

// экспорт санок для удаления задачи
export const deleteTask = createAsyncThunk(
  'todo/deleteTask',
  async (task) => {
    const { id } = task;
    const placeId = task.place_id;
    const response = await fetch(`/api/place/${placeId}/tasks`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        id
      })
    });
    const data = await response.json();
    return data;
  }
);

// экспорт санок для изменения статуса (done) задачи
export const putDoneTask = createAsyncThunk(
  'todo/putDoneTask',
  async (taskObj) => {
    const placeId = taskObj.place_id;
    const response = await fetch(`/api/place/${placeId}/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        taskObj
      })
    });
    const data = await response.json();
    return data;
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.fulfilled, (state, action) => {
        // фильтрую пришедший массив с тасками и оставляю в нем только те, которых в стейте еще нет
        const newTasks = action.payload.filter((el) =>
          !state.tasks.find((task) => task.id === el.id));
        // и затем пушу их массив в стейт
        state.tasks.push(...newTasks);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { id } = action.payload;
          state.tasks = state.tasks.filter((task) => task.id !== id);
        }
      })
      .addCase(putDoneTask.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { id, done } = action.payload;
          state.tasks = state.tasks.map((task) => task.id === id ? { ...task, done } : task);
        }
      });
  }
});

// экспорт функции селектора
export const selectTasks = (state) => state.todo.tasks;

// экспорт функции редьюсера
export default todoSlice.reducer;
