import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ACTIVITY = 'GET_ACTIVITY';
const GET_ACTIVITIES = 'GET_ACTIVITIES';
const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';
const ADD_ACTIVITY = 'ADD_ACTIVITY';
const EDIT_ACTIVITY = 'EDIT_ACTIVITY';

// INITIAL STATE
const defaultActivity = {};

// ACTION CREATORS
const getActivity = activity => ({type: GET_ACTIVITY, activity});
const getActivities = activities => ({type: GET_ACTIVITIES, activities});
const removeActivity = activity => ({type: REMOVE_ACTIVITY, activity});
const addActivity = activity => ({type: ADD_ACTIVITY, activity});
const editActivity = activity => ({type: EDIT_ACTIVITY, activity});


// THUNK CREATORS
export const fetchActivity = (id) =>
  dispatch =>
    axios.get(`/api/activities/${id}`)
      .then(res =>
        dispatch(getActivity(res.data)))
      .catch(err => console.log(err));

export const fetchActivities = (id) =>
  dispatch =>
    axios.get(`/api/activities/${id}`)
      .then(res =>
        dispatch(getActivities(res.data)))
      .catch(err => console.log(err));

export const postActivity = (activity) =>
  dispatch => {
   axios.post(`/api/activities`, activity)
      .then((res) => res.data)
      .then((newActivity) =>
        dispatch(addActivity(newActivity)))
      .catch(err => console.log(err))};

export const updateActivity = (activity) =>
  dispatch => {
    return axios.put(`/api/activities/${activity.id}`, activity)
      .then(() => {
        dispatch(editActivity(activity))
      })
      .catch(err => console.log(err))};

export const deleteActivity = (id) =>
  dispatch =>
    axios.delete(`api/activities/${id}`)
    .then(() => dispatch(removeActivity(id)))
    .catch(err => console.log(err));

// REDUCER
export default function reducer (state = {allActivities: []}, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return {...state, allActivities: action.activity}

    case GET_ACTIVITIES:
      return {...state, allActivities: action.activities}

    case ADD_ACTIVITY:
      return {...state, allActivities: [action.activity, ...state.allActivities]}

    case REMOVE_ACTIVITY:
      return {...state, allActivities: state.allActivities.filter(activity => activity.id !== action.activity)}

    case EDIT_ACTIVITY:
      return {...state, allActivities: state.allActivities.filter(activity => activity.id !== action.activity.id).concat(action.activity)}

    default:
      return state;
  }
}
