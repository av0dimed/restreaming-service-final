import {Grid, Typography} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getSubscribedStreamParams} from '../services/StreamRequests'
import useStyles from '../Styles'
import StreamerGridItem from './StreamerGridItem'

export default function SubscriptionsPage() {
    const classes = useStyles()
    const [data, setData] = useState([])
    const isLoggedIn = useSelector((state) => state.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            getSubscribedStreamParams((params) => {
                setData(params)
            })
        }
    }, [])

    if (isLoggedIn) {
        return (
            <>
                {data.length !== 0 ? (
                    <Grid container justify='center'>
                        {data.map((d) => (
                            <Grid item>
                                <StreamerGridItem
                                    streamer={d.streamer}
                                    title={d.title}
                                    subscribers={d.subscribers}
                                    isSubscribed={d.isSubscribed}
                                    tags={d.tags}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant='h6'>Вы пока ни на кого не подписаны :(</Typography>
                )}
            </>
        )
    } else {
        return <Typography variant='h6'>Войдите для просмотра списка своих подписок</Typography>
    }
}
