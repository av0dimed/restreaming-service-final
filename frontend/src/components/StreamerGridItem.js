import {Card, CardActions, CardContent, Chip, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import useStyles from '../Styles'
import SubscribeButton from './SubscribeButton'
import {getTagStyle} from './Tags'

export default function StreamerGridItem(props) {
    const classes = useStyles()

    return (
        <>
            <Card className={classes.streamerGridItem}>
                <CardContent style={{flexGrow: 1}}>
                    <Typography
                        noWrap
                        variant='h4'
                        className={classes.headerTitle}
                        component={Link}
                        color='primary'
                        to={'/' + props.streamer}>
                        {props.streamer}
                    </Typography>
                    <Typography variant='h5' noWrap>
                        {props.title}
                    </Typography>
                    <div className={classes.chipsInGrid}>
                        {props.tags.map((tag) => (
                            <Chip label={tag} className={classes.tagChip} style={getTagStyle(tag)}/>
                        ))}
                    </div>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {'Подписчиков: ' + props.subscribers}
                    </Typography>
                </CardContent>
                <CardActions style={{padding: '16px'}}>
                    <SubscribeButton streamer={props.streamer} isSubscribed={props.isSubscribed}/>
                </CardActions>
            </Card>
        </>
    )
}
