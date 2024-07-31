import axios from 'axios';
import { getToken } from './AuthService';

const REST_API_BASE_URL = 'http://localhost:8080/api/todos';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const getAllTodos = () => axios.get(REST_API_BASE_URL);

export const saveTodo = (todo) => axios.post(REST_API_BASE_URL, todo);

export const updateTodo = (todoId, todo) => axios.put(REST_API_BASE_URL+ '/' + todoId, todo);

export const getTodo = (todoId) => axios.get(REST_API_BASE_URL+ '/' + todoId);

export const deleteTodo = (todoId) => axios.delete(REST_API_BASE_URL+ '/' + todoId);

export const completeTodo = (todoId) => axios.patch(REST_API_BASE_URL+ '/' + todoId + '/complete');

export const inCompleteTodo = (todoId) => axios.patch(REST_API_BASE_URL+ '/' + todoId + '/in-complete');