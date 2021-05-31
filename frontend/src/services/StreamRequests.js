import {getAuthHeader} from './Auth'
import {basicErrorHandler, basicResponseHandler} from './ErrorHandlers'

const API_URL = 'http://localhost:8080/stream/api/'

export function getStreamParams(username, callback) {
    fetch(API_URL + `getParams?streamer=${username}`, {method: 'GET'})
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

export function getAllStreamParams(callback) {
    fetch(API_URL + 'getAllStreamers', {
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

export function getSubscribedStreamParams(callback) {
    fetch(API_URL + 'getSubscribedStreamers', {
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

export function subscribe(streamer, callback) {
    fetch(API_URL + `subscribe?streamer=${streamer}`, {
        method: 'GET',
        headers: getAuthHeader(),
    })
        .then(basicResponseHandler)
        .then((response) => {
            console.log(response)
            callback()
        })
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

export function unsubscribe(streamer, callback) {
    fetch(API_URL + `unsubscribe?streamer=${streamer}`, {
        method: 'GET',
        headers: getAuthHeader(),
    })
        .then(basicResponseHandler)
        .then((response) => {
            console.log(response)
            callback()
        })
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}

export function getFullStreamParams(callback) {
    fetch(API_URL + 'getFullParams', {
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

export function updateStreamParams(body) {
    fetch(API_URL + 'updateParams', {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(body),
    })
        .then(basicResponseHandler)
        .catch((e) => {
            console.log('Error: ' + e.message)
            basicErrorHandler(e)
        })
}
