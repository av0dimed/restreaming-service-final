import {Chip, Grid} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getAllStreamParams} from '../services/StreamRequests'
import useStyles from '../Styles'
import StreamerGridItem from './StreamerGridItem'
import {getTags} from './Tags'

function HomePage() {
    const classes = useStyles()
    const [data, setData] = useState()
    const [visible, setVisible] = useState()
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    const tags = getTags()
    const [selectedChips, setSelectedChips] = useState([])

    useEffect(() => {
        getAllStreamParams((params) => {
            setData(params)
        })
    }, [isLoggedIn])

    const onFilter = (tag) => {
        if (selectedChips.includes(tag)) {
            setSelectedChips(selectedChips.filter((t) => t !== tag))
        } else {
            setSelectedChips([...selectedChips, tag])
        }
    }

    useEffect(() => {
        if (selectedChips.length === 0) {
            setVisible(data)
        } else {
            setVisible(
                data.filter((d) => {
                    return d.tags.filter((t) => selectedChips.includes(t)).length !== 0
                })
            )
        }
    }, [data, selectedChips])

    console.log(visible)

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div>
                    {tags.map((tag) => (
                        <Chip
                            label={tag.tag}
                            className={classes.tagChip}
                            onClick={() => onFilter(tag.tag)}
                            style={selectedChips.includes(tag.tag) ? {backgroundColor: tag.color, color: '#000000'} : {}}
                        />
                    ))}
                </div>
                <div>
                    <Grid container justify='center'>
                        {visible &&
                        visible.map((d) => (
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
                </div>
            </div>
        </>
    )
}

export default HomePage
