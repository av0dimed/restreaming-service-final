import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { register } from '../services/Auth'
import useStyles from '../Styles'

function RegistrationForm() {
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
        register(username, password, dispatch)
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
                            helperText='Имя изменить будет нельзя'
                            type='text'
                            fullWidth
                            color='secondary'
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
                            Зарегистрироваться
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default RegistrationForm
