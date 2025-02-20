import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchTasks = () => async (dispatch) => {
    try {
        const { data } = await API.get('/tasks');
        dispatch({ type: 'SET_TASKS', payload: data });
    } catch (error) {
        console.error(error);
    }
};

export const addTask = (task) => async (dispatch) => {
    try {
        await API.post('/tasks', task);
        dispatch(fetchTasks());
    } catch (error) {
        console.error(error);
    }
};
