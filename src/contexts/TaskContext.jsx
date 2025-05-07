import React, { createContext, useReducer, useContext, useEffect } from 'react';
import * as taskService from '../services/taskService';

const initialState = {
  tasks: [],
  status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const ACTIONS = {
  FETCH_START:   'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR:   'FETCH_ERROR',
  ADD_TASK:      'ADD_TASK',
  // you can add UPDATE_TASK, DELETE_TASK here later
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

  return (
    <TaskContext.Provider value={{ ...state, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
