import {Typography} from '@material-ui/core'
import {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import {useSelector} from 'react-redux'
import useStyles from '../Styles'

// https://cph-msl.akamaized.net/hls/live/2000341/test/master.m3u8

function Player() {
    const classes = useStyles()
    const url = useSelector((state) => state.streamUrl)
    const [isStubbed, setIsStubbed] = useState(false)

    useEffect(() => {
        setIsStubbed(url === null || url === '')
    }, [url])

    const onErrorPlayer = () => {
        setIsStubbed(true)
    }

    return (
        <>
            <div className={classes.playerWrapper}>
                {!isStubbed && (
                    <ReactPlayer
                        url={url}
                        width='100%'
                        height='100%'
                        className={classes.player}
                        controls
                        playing
                        onError={onErrorPlayer}
                    />
                )}
                {isStubbed && <Typography variant='h4'>Трансляция пока не запущена</Typography>}
            </div>
        </>
    )
}

export default Player
