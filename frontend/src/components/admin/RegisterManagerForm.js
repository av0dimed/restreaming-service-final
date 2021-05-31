import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@material-ui/core'
import {useState} from 'react'
import {registerManager} from '../../services/AdminRequests'
import useStyles from '../../Styles'

function RegistrationManagerForm(props) {
    const [username, setUsername] = useState('')
    const classes = useStyles()

    const handleClose = () => {
        props.setOpen(false)
    }

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        registerManager(username, props.callback)
        handleClose()
    }

    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>
                <form onSubmit={onSubmit}>
                    <DialogContent>
                        <DialogTitle className={classes.dialogTitle}>Создание нового аккаунта менеджера</DialogTitle>
                        <DialogContentText>
                            Чтобы зарегистрировать нового менеджера, введите его никнейм. Транспортный пароль
                            отобразится в вашей панели управления. Менеджер сам сможет сменить пароль в своем личном
                            кабинете.
                        </DialogContentText>
                        <TextField
                            margin='dense'
                            id='name'
                            label='Никнейм менеджера'
                            helperText='Имя изменить будет нельзя'
                            type='text'
                            fullWidth
                            autoFocus
                            color='secondary'
                            onChange={onChangeUsername}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='primary' type='submit' className={classes.beautifulButton}>
                            Зарегистрировать менеджера
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default RegistrationManagerForm
