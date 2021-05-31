import jwt_decode from 'jwt-decode'
import {
    changeUsername,
    isAdmin,
    isManager,
    isNotAdmin,
    isNotManager,
    isNotStreamer,
    isStreamer,
    loggedIn,
    loggedOut,
} from '../actions'
import {basicErrorHandler, basicResponseHandler} from './ErrorHandlers'

const API_URL = 'http://localhost:8080/auth/'

export const register = (username, password, dispatch) => {
    var body = {
        username,
        password,
    }
    fetch(API_URL + 'register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(basicResponseHandler)
        .then(() => {
            login(username, password, dispatch)
        })
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

export const login = (username, password, dispatch) => {
    var body = {
        username,
        password,
    }
    fetch(API_URL + 'login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(basicResponseHandler)
        .then((response) => {
            if (response.status === 200 && response.headers.get('Authorization')) {
                localStorage.setItem('token', response.headers.get('Authorization').split(' ')[1])
                checkAuthorization(dispatch)
            }
        })
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

export const changePassword = (oldPassword, password) => {
    var body = {
        oldPassword,
        password,
    }
    fetch(API_URL + 'changePassword', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: getAuthHeader(),
    })
        .then(basicResponseHandler)
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

const getRole = () => {
    var decodedJwt = jwt_decode(localStorage.getItem('token'))
    if (decodedJwt.authorities) {
        return decodedJwt.authorities[0]
    }
    return null
}

const getUsername = () => {
    var decodedJwt = jwt_decode(localStorage.getItem('token'))
    if (decodedJwt.sub) {
        return decodedJwt.sub
    }
    return ''
}

const hasTokenInLS = (dispatch) => {
    var token = localStorage.getItem('token')
    if (token) {
        if (Date.now() / 1000 > jwt_decode(token).exp) {
            logout(dispatch)
            return false
        } else {
            return true
        }
    }

    return false
}

export const checkAuthorization = (dispatch) => {
    if (hasTokenInLS(dispatch)) {
        dispatch(loggedIn())
        dispatch(changeUsername(getUsername()))
        var role = getRole()
        switch (role) {
            case 'ROLE_USER':
                break
            case 'ROLE_STREAMER':
                dispatch(isStreamer())
                break
            case 'ROLE_MANAGER':
                dispatch(isManager())
                break
            case 'ROLE_ADMIN':
                dispatch(isAdmin())
                break
        }
    }
}

export const logout = (dispatch) => {
    localStorage.removeItem('token')
    dispatch(loggedOut())
    dispatch(isNotStreamer())
    dispatch(isNotManager())
    dispatch(isNotAdmin())
    dispatch(changeUsername(''))
}

export const getAuthHeader = () => {
    return {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8',
    }
}
