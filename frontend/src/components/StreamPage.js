import {Chip, Typography} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {changeStreamUrl} from '../actions'
import {getStreamParams} from '../services/StreamRequests'
import {connect} from '../services/WebSocket'
import useStyles from '../Styles'
import Chat from './Chat'
import Player from './Player'
import SubscribeButton from './SubscribeButton'
import {getTagStyle} from './Tags'

function StreamPage() {
    const classes = useStyles()
    const {streamerName} = useParams()
    const [title, setTitle] = useState('')
    const username = useSelector((state) => state.username)
    const dispatch = useDispatch()
    const [wsClient, setWsClient] = useState()
    const [tags, setTags] = useState()
    const [isSubscribed, setSubscribed] = useState()

    var isBlocked = streamerName === 'login' || streamerName === 'register' || streamerName === 'changePassword'

    useEffect(() => {
        if (!isBlocked) {
            getStreamParams(streamerName, (params) => {
                setTitle(params.title)
                dispatch(changeStreamUrl(params.url))
                var client = connect(dispatch, streamerName, username)
                setWsClient(client)
                setTags(params.tags)
                setSubscribed(params.isSubscribed)
            })
        }
    }, [streamerName, username])

    useEffect(() => {
        if (wsClient) {
            return () => {
                wsClient.disconnect(() => console.log('disconnected'))
            }
        }
    }, [wsClient])

    return (
        <>
            {!isBlocked && (
                <>
                    <div className={classes.playerContainer}>
                        <Player/>
                        <Chat wsClient={wsClient}/>
                    </div>
                    <div>
                        <Typography variant='h4'>{title}</Typography>
                        {tags &&
                        tags.map((tag) => (
                            <Chip label={tag} className={classes.tagChip} style={getTagStyle(tag)}/>
                        ))}
                        <SubscribeButton streamer={streamerName} isSubscribed={isSubscribed}/>
                    </div>
                </>
            )}
        </>
    )
}

export default StreamPage
