import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ACTIVITY = 'GET_ACTIVITY'
const GET_ACTIVITIES = 'GET_ACTIVITIES'
// const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY'
// const ADD_ACTIVITY = 'ADD_ACTIVITY'
// const EDIT_ACTIVITY = 'EDIT_ACTIVITY'
// const ALERT_ACTIVITY = 'ALERT_ACTIVITY'

// INITIAL STATE
const defaultActivity = {}

// ACTION CREATORS

const getActivity = activity => {{type: GET_ACTIVITY, activity}}
const getActivities = activities => {{type: GET_ACTIVITIES, activities}}
// const removeActivity = activity => {{type: REMOVE_ACTIVITY, activity}}
// const addActivity = activity => {{type: ADD_ACTIVITY, activity}}
// const editActivity = activity => {{type: EDIT_ACTIVITY, activity}}
// const alertActivity = activity => {{type: ALERT_ACTIVITY, activity}}


// THUNK CREATORS

export const fetchActivity = (id) =>
  dispatch =>
    axios.get(`/api/activities/${id}`)
      .then(res =>
        dispatch(getActivity(res.data)))
      .catch(err => console.log(err))
      
export const fetchActivities = () => 
  dispatch => 
    axios.get(`/api/activities`)
      .then(res => 
        dispatch(getActivities(res.data)))
      .catch(err => console.log(err))

// REDUCER

export default function reducer (state = {allActivites: []}, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return {...state, allActivities: action.activity}
    
    case GET_ACTIVITIES:
      return {...state, allActivities: action.activities}
    
    default:
      return state;
  }
}

