import {AppBar, CircularProgress, CssBaseline, Snackbar, ThemeProvider, Toolbar, Typography} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ChangePasswordForm from './components/ChangePasswordForm'
import RegistrationForm from './components/RegisterForm'
import StreamPage from './components/StreamPage'
import StreamPanel from './components/StreamPanel'
import UserPanel from './components/UserPanel'
import {checkAuthorization} from './services/Auth'
import useStyles from './Styles'
import theme from './Theme'
import {setCallback} from './services/ErrorHandlers'
import AdminPanel from './components/admin/AdminPanel'
import ManagerPanel from './components/manager/ManagerPanel'
import HomePage from './components/HomePage'
import SubscriptionsPage from './components/SubscriptionsPage'

function App() {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const isLoggedIn = useSelector((state) => state.isLoggedIn)

    const dispatch = useDispatch()

    const alertCallback = (message) => {
        setAlertMessage(message)
        setAlertOpen(true)
    }

    useEffect(() => {
        setCallback(alertCallback)
        checkAuthorization(dispatch)
        setLoading(false)
    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setAlertOpen(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <header>
                <AppBar position='relative'>
                    <Toolbar className={classes.beautifulToolbar}>
                        <Typography
                            component={Link}
                            to='/'
                            variant='h4'
                            className={classes.headerTitle}
                            color='secondary'>
                            Re:streaming
                        </Typography>
                        <UserPanel />
                    </Toolbar>
                </AppBar>
            </header>
            <main className={classes.main}>
                {loading && <CircularProgress />}
                {!loading && (
                    <>
                        <Switch>
                            <Route path='/streamerPanel'>
                                <StreamPanel/>
                            </Route>
                            <Route path='/managerPanel'>
                                <ManagerPanel/>
                            </Route>
                            <Route path='/adminPanel'>
                                <AdminPanel/>
                            </Route>
                            <Route path='/subscriptions'>
                                <SubscriptionsPage/>
                            </Route>
                            <Route path='/:streamerName'>
                                <StreamPage/>
                            </Route>
                            <Route path='/'>
                                <HomePage/>
                            </Route>
                        </Switch>
                        {isLoggedIn && (
                            <Switch>
                                <Route path='**/changePassword'>
                                    <ChangePasswordForm />
                                </Route>
                            </Switch>
                        )}
                    </>
                )}
                {!isLoggedIn && (
                    <Switch>
                        <Route path='**/login'>
                            <LoginForm />
                        </Route>
                        <Route path='**/register'>
                            <RegistrationForm />
                        </Route>
                    </Switch>
                )}
                <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity='error'>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </main>
        </ThemeProvider>
    )
}

export default App
