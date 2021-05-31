import { combineReducers } from 'redux'
import isAdminReducer from './isAdminReducer'
import isLoggedInReducer from './isLoggedInReducer'
import isManagerReducer from './isManagerReducer'
import isStreamerReducer from './isStreamerReducer'
import streamUrlReducer from './streamUrlReducer'
import usernameReducer from './usernameReducer'

const rootReducer = combineReducers({
    isLoggedIn: isLoggedInReducer,
    isStreamer: isStreamerReducer,
    isManager: isManagerReducer,
    isAdmin: isAdminReducer,
    streamUrl: streamUrlReducer,
    username: usernameReducer,
})

export default rootReducer
