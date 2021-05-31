import {getAuthHeader} from './Auth'
import {basicErrorHandler, basicResponseHandler} from './ErrorHandlers'

const API_URL = 'http://localhost:8080/manager/'

export function getStreamers(callback) {
    fetch(API_URL + 'getStreamers', {
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

export function registerStreamer(username, callback) {
    fetch(API_URL + 'registerStreamer', {
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

export function resetStreamerPassword(username, callback) {
    fetch(API_URL + 'resetStreamerPassword', {
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

export function deleteStreamer(username, callback) {
    fetch(API_URL + `deleteStreamer?streamer=${username}`, {
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
