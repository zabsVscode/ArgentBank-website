import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
  } from '../reducers/loginReducer'
  import {
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_RESET,
    USER_PROFILE_UPDATE,
  } from '../reducers/userReducer'
  import axios from 'axios'
  
  // Login action
  
  export const login = (email, password) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        { email, password },
        config
      )
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      dispatch(userProfile(data.body.token))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  // User's profile action
  
  export const userProfile = (token) => async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
  
      const { data } = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        { token },
        config
      )
  
      dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  // User's update profile
  
  export const updateProfile =
    (token, newUsername, newLastName) => async (dispatch) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
  
        const data = await axios.put(
          'http://localhost:3001/api/v1/user/profile',
          { userName: newUsername, },
          config
        );
  
        dispatch({ type: USER_PROFILE_UPDATE, payload: data });
        return {success:true};
      } catch (error) {
        dispatch({
          type: USER_PROFILE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
    }
  
  // Logout action
  
  export const logout = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_PROFILE_RESET })
  }