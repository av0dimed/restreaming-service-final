import React, {useEffect, useState} from 'react'
import BasicTable from './StreamUrlTable'
import theme from '../Theme'
import {Chip, IconButton, TextField, ThemeProvider, Typography} from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import useStyles from '../Styles'
import {Clear, Save} from '@material-ui/icons'
import {getFullStreamParams, updateStreamParams} from '../services/StreamRequests'
import {useSelector} from 'react-redux'
import {getTags} from './Tags'

function StreamPanel() {
    const classes = useStyles()
    const [disabled, setDisabled] = useState(true)
    const [title, setTitle] = useState('')
    const [urls, setUrls] = useState([])
    const [selectedUrl, setSelectedUrl] = useState(null)
    const isStreamer = useSelector((state) => state.isStreamer)
    const [selectedTags, setSelectedTags] = useState([])
    const tags = getTags()

    const setParams = (params) => {
        setTitle(params.title)
        setSelectedUrl(params.url)
        setUrls(params.urls ? params.urls : [])
        setSelectedTags(params.tags)
    }

    useEffect(() => {
        if (isStreamer) {
            getFullStreamParams(setParams)
        }
    }, [isStreamer])

    const handleChange = () => {
        setDisabled(!disabled)
    }

    const onSave = () => {
        updateStreamParams({
            title,
            url: selectedUrl,
            urls,
            tags: selectedTags,
        })
    }

    const onCancel = () => {
        getFullStreamParams(setParams)
    }

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onSelect = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag))
        } else {
            setSelectedTags([...selectedTags, tag])
        }
    }

    return (
        <>
            {isStreamer && (
                <ThemeProvider theme={theme}>
                    <div className={classes.StreamPanelContainerr}>
                        <div className={classes.StreamPanelContainer}>
                            <div className={classes.streamPanelHeader}>
                                <TextField
                                    value={title}
                                    disabled={disabled}
                                    className={classes.streamPanelTitle}
                                    fullWidth
                                    label='Название трансляции'
                                    type='text'
                                    onChange={onChangeTitle}
                                />
                                <FormControlLabel
                                    control={<Switch checked={!disabled} onChange={handleChange} />}
                                    color='primary'
                                    label='Редактировать'
                                />
                                <IconButton
                                    disabled={disabled}
                                    aria-label='delete'
                                    aria-controls='delete the row'
                                    onClick={() => onCancel()}
                                    color='primary'
                                    className={classes.iconButton}>
                                    <Clear />
                                </IconButton>
                                <IconButton
                                    disabled={disabled}
                                    aria-label='сохранить изменения'
                                    aria-controls='отправить на бэк'
                                    onClick={() => onSave()}
                                    color='primary'
                                    className={classes.iconButton}>
                                    <Save/>
                                </IconButton>
                            </div>
                            <div>
                                {tags.map((tag) => (
                                    <Chip
                                        disabled={disabled}
                                        label={tag.tag}
                                        className={classes.tagChip}
                                        onClick={() => onSelect(tag.tag)}
                                        style={selectedTags.includes(tag.tag) ? {backgroundColor: tag.color} : {}}
                                    />
                                ))}
                            </div>
                            <div className={classes.StreamPanelLayout}>
                                <BasicTable
                                    data={urls}
                                    setData={setUrls}
                                    selected={selectedUrl}
                                    setSelected={setSelectedUrl}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            )}
            {!isStreamer && <Typography variant='h6'>Отсутствуют права для доступа к этой странице</Typography>}
        </>
    )
}

export default StreamPanel
