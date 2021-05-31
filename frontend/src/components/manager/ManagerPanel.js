import React, {useEffect, useState} from 'react'
import BasicManagerTable from './ManagerStreamersTable'
import theme from '../../Theme'
import useStyles from '../../Styles'
import {ThemeProvider} from '@material-ui/styles'
import {useSelector} from 'react-redux'
import {Button, Typography} from '@material-ui/core'
import RegistrationStreamerForm from './RegisterStreamerForm'
import {getStreamers} from '../../services/ManagerRequests'

function ManagerPanel() {
    const classes = useStyles()
    const [streamers, setStreamers] = useState([])
    const [open, setOpen] = useState(false)
    const [isUpdated, setIsUpdated] = useState(true)
    const isManager = useSelector((state) => state.isManager)

    useEffect(() => {
        if (isManager) {
            getStreamers(setStreamers)
        }
    }, [isUpdated, isManager])

    return (
        <>
            {isManager && (
                <ThemeProvider theme={theme}>
                    <BasicManagerTable data={streamers} callback={() => setIsUpdated(!isUpdated)} />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setOpen(true)}
                        className={classes.beautifulButton}>
                        Зарегистрировать нового стримера
                    </Button>
                    <RegistrationStreamerForm open={open} setOpen={setOpen} callback={() => setIsUpdated(!isUpdated)} />
                </ThemeProvider>
            )}
            {!isManager && <Typography variant='h6'>Отсутствуют права для доступа к этой странице</Typography>}
        </>
    )
}

export default ManagerPanel
