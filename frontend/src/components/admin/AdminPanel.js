import {Button, Typography} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getManagers} from '../../services/AdminRequests'
import useStyles from '../../Styles'
import theme from '../../Theme'
import BasicAdminTable from './AdminManagersTable'
import RegistrationManagerForm from './RegisterManagerForm'

function AdminPanel() {
    const classes = useStyles()
    const [managers, setManagers] = useState([])
    const [open, setOpen] = useState(false)
    const [isUpdated, setIsUpdated] = useState(true)
    const isAdmin = useSelector((state) => state.isAdmin)

    useEffect(() => {
        if (isAdmin) {
            getManagers(setManagers)
        }
    }, [isUpdated, isAdmin])

    return (
        <>
            {isAdmin && (
                <ThemeProvider theme={theme}>
                    <BasicAdminTable data={managers} callback={() => setIsUpdated(!isUpdated)} />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => setOpen(true)}
                        className={classes.beautifulButton}>
                        Зарегистрировать нового менеджера
                    </Button>
                    <RegistrationManagerForm open={open} setOpen={setOpen} callback={() => setIsUpdated(!isUpdated)} />
                </ThemeProvider>
            )}
            {!isAdmin && <Typography variant='h6'>Отсутствуют права для доступа к этой странице</Typography>}
        </>
    )
}

export default AdminPanel
