//contexts/TaskContext.jsx
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import * as taskService from '../services/taskService';

const initialState = {
  tasks: [],
  status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, status: 'loading', error: null };
    case ACTIONS.FETCH_SUCCESS:
      return { ...state, status: 'succeeded', tasks: action.payload };
    case ACTIONS.FETCH_ERROR:
      return { ...state, status: 'failed', error: action.payload };
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t._id === action.payload._id ? action.payload : t
        )
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(t => t._id !== action.payload)
      };

    default:
      return state;
  }
}

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fetch tasks on mount
  useEffect(() => {
    const load = async () => {
      dispatch({ type: ACTIONS.FETCH_START });
      try {
        const tasks = await taskService.getAll();
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: tasks });
      } catch (err) {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: err.message });
      }
    };
    load();
  }, []);

  const addTask = async (taskData) => {
    const newTask = await taskService.create(taskData);
    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
  };

  const updateTask = async (_id, updates) => {
    const updated = await taskService.update(_id, updates);
    dispatch({ type: ACTIONS.UPDATE_TASK, payload: updated });
  };


  const deleteTask = async (_id) => {
    await taskService.remove(_id);
    dispatch({ type: ACTIONS.DELETE_TASK, payload: _id });
  };

  return (
    <TaskContext.Provider value={{ ...state, addTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
