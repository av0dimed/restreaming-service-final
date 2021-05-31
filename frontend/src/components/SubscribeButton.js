import {Button} from '@material-ui/core'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {subscribe, unsubscribe} from '../services/StreamRequests'

export default function SubscribeButton(props) {
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const [isSubscribed, setSubscribed] = useState(props.isSubscribed)

    const subscribeFunc = () => {
        subscribe(props.streamer, changeSubscribtion)
    }

    const unsubscribeFunc = () => {
        unsubscribe(props.streamer, changeSubscribtion)
    }

    const changeSubscribtion = () => {
        setSubscribed(!isSubscribed)
    }

    if (isSubscribed && isLoggedIn) {
        return (
            <Button variant='outlined' color='secondary' disabled={!isLoggedIn} onClick={unsubscribeFunc}>
                Отписаться
            </Button>
        )
    } else {
        return (
            <Button variant='contained' color='primary' disabled={!isLoggedIn} onClick={subscribeFunc}>
                Подписаться
            </Button>
        )
    }
}
