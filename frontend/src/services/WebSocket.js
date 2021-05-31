import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import {changeStreamUrl} from '../actions'

var stompClient = null
var chatCallback = () => {}
var streamer = null
var dispatch = null
var username = null

export const connect = (_dispatch, _streamer, _user) => {
    const sockJS = new SockJS('http://localhost:8080/stream/ws')
    stompClient = Stomp.over(sockJS)

    streamer = _streamer
    dispatch = _dispatch
    username = _user

    stompClient.connect({}, onConnected, onError)

    return stompClient
}

const onUrlReceived = (message) => {
    var msg = JSON.parse(message.body)
    dispatch(changeStreamUrl(msg.url))
}

const onMessageReceived = (message) => {
    console.log(message)
    var msg = JSON.parse(message.body)
    chatCallback(msg)
}

const onConnected = () => {
    console.log('connected')

    stompClient.subscribe('/stream/url/' + streamer, onUrlReceived)

    stompClient.subscribe('/stream/chat/' + streamer, onMessageReceived)
}

const onError = () => {
    console.log('error')
}

export const sendMessage = (message) => {
    var body = {
        streamer,
        username,
        message,
    }
    stompClient.send('/app/chat', {}, JSON.stringify(body))
}

export const setChatCallback = (callback) => {
    chatCallback = callback
}
