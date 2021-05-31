import {IconButton, Paper, TextField, Typography} from '@material-ui/core'
import {Send} from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {sendMessage, setChatCallback} from '../services/WebSocket'
import useStyles from '../Styles'

function Chat() {
    const classes = useStyles()
    const [input, setInput] = useState('')
    const [messageHistory, setMessageHistory] = useState([])
    const isLoggedIn = useSelector((state) => state.isLoggedIn)

    const onInputChange = (e) => {
        setInput(e.target.value)
    }

    //заполним чат
    useEffect(() => {
        setChatCallback((msg) => {
            setMessageHistory((prev) => [...prev, msg])
            var element = document.getElementById('chat')
            element.scrollTop = element.scrollHeight
        })
    }, [])

    const onSend = () => {
        sendMessage(input)
        setInput('')
    }

    const onKeyPressed = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            onSend()
        }
    }

    return (
        <>
            <div className={classes.chat}>
                <Paper className={classes.chatPaper}>
                    <div className={classes.chatBox} id='chat'>
                        {messageHistory.map((message) => (
                            <div>
                                <Typography display='inline' color='secondary'>
                                    {`${message.username}:`}
                                </Typography>
                                <Typography display='inline' paragraph={true}>{` ${message.message}`}</Typography>
                            </div>
                        ))}
                    </div>
                    <div className={classes.layoutRow}>
                        <TextField
                            value={input}
                            label={isLoggedIn ? 'Введите сообщение' : 'Войдите чтобы отправлять сообщения'}
                            onChange={onInputChange}
                            onKeyDown={onKeyPressed}
                            variant='outlined'
                            autoFocus
                            fullWidth
                            multiline
                            rows={1}
                            rowsMax={3}
                            disabled={!isLoggedIn}
                        />
                        <div>
                            <IconButton
                                className={classes.chatButton}
                                aria-label='message'
                                aria-controls='send message'
                                onClick={() => onSend()}
                                color='secondary'
                                disabled={!isLoggedIn}>
                                <Send />
                            </IconButton>
                        </div>
                    </div>
                </Paper>
            </div>
        </>
    )
}

export default Chat
