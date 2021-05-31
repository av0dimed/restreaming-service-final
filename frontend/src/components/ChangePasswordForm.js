import {Button, Dialog, DialogActions, DialogContent, TextField} from '@material-ui/core'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {changePassword} from '../services/Auth'
import useStyles from '../Styles'

function ChangePasswordForm() {
    const history = useHistory()
    const [oldPassword, setOldPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const dispatch = useDispatch()
    const classes = useStyles()
    const [match, setMatch] = useState(true)

    const isLoggedIn = useSelector((state) => state.isLoggedIn)

    useEffect(() => {
        doMatch(password1, password2)
    }, [password1, password2])

    const handleClose = () => {
        history.goBack()
    }

    const onChangeOldPassword = (event) => {
        setOldPassword(event.target.value)
    }
    const onChangePassword1 = (event) => {
        setPassword1(event.target.value)
    }
    const onChangePassword2 = (event) => {
        setPassword2(event.target.value)
    }

    const doMatch = (pswrd1, pswrd2) => {
        if (pswrd1 && pswrd2) {
            if (pswrd1 === pswrd2) {
                setMatch(true)
            } else {
                setMatch(false)
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        changePassword(oldPassword, password1)
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
                            label='Введите текущий пароль'
                            color='secondary'
                            type='password'
                            fullWidth
                            onChange={onChangeOldPassword}
                        />
                        <TextField
                            margin='dense'
                            id='name'
                            label='Введите новый пароль'
                            color='secondary'
                            type='password'
                            fullWidth
                            error={!match}
                            helperText={!match ? 'Пароли не совпадают' : null}
                            onChange={onChangePassword1}
                        />
                        <TextField
                            margin='dense'
                            id='password'
                            label='Подтвердите новый пароль'
                            type='password'
                            color='secondary'
                            error={!match}
                            helperText={!match ? 'Пароли не совпадают' : null}
                            fullWidth
                            onChange={onChangePassword2}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            className={classes.beautifulButton}
                            disabled={!match}>
                            Сменить пароль
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default ChangePasswordForm
