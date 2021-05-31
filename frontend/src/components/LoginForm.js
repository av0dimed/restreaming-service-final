import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../services/Auth'
import useStyles from '../Styles'

function LoginForm() {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleClose = () => {
        history.goBack()
    }

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        login(username, password, dispatch)
        handleClose()
    }

    return (
        <>
            <Dialog open={true} onClose={handleClose}>
                <form onSubmit={onSubmit}>
                    <DialogContent>
                        <TextField
                            margin='dense'
                            id='name'
                            label='Никнейм'
                            color='secondary'
                            type='text'
                            fullWidth
                            onChange={onChangeUsername}
                        />
                        <TextField
                            margin='dense'
                            id='password'
                            label='Пароль'
                            type='password'
                            color='secondary'
                            fullWidth
                            onChange={onChangePassword}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='primary' type='submit' className={classes.beautifulButton}>
                            Войти
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default LoginForm
