import {getAuthHeader} from './Auth'
import {basicErrorHandler, basicResponseHandler} from './ErrorHandlers'

const API_URL = 'http://localhost:8080/admin/'

export function getManagers(callback) {
    fetch(API_URL + 'getManagers', {
        method: 'GET',
        headers: getAuthHeader(),
    })
        .then(basicResponseHandler)
        .then((response) => response.json())
        .then((params) => {
            console.log(params)
            callback(params)
        })
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

export function registerManager(username, callback) {
    fetch(API_URL + 'registerManager', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ username }),
    })
        .then(basicResponseHandler)
        .then((response) => response.text())
        .then((params) => {
            console.log(params)
            callback()
        })
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

export function resetManagerPassword(username, callback) {
    fetch(API_URL + 'resetManagerPassword', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify({ username }),
    })
        .then(basicResponseHandler)
        .then((response) => response.text())
        .then((params) => {
            console.log(params)
            callback()
        })
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

export function deleteManager(username, callback) {
    fetch(API_URL + `deleteManager?manager=${username}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
    })
        .then(basicResponseHandler)
        .then(callback)
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}
