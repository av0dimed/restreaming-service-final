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
import useStyles from '../../Styles'
import {registerStreamer} from '../../services/ManagerRequests'

function RegistrationStreamerForm(props) {
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
        registerStreamer(username, props.callback)
        handleClose()
    }

    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>
                <form onSubmit={onSubmit}>
                    <DialogContent>
                        <DialogTitle className={classes.dialogTitle}>Создание нового аккаунта стримера</DialogTitle>
                        <DialogContentText>
                            Чтобы зарегистрировать нового стримера, введите его никнейм. Транспортный пароль отобразится
                            в вашей панели управления. Стример сам сможет сменить пароль в своем личном кабинете.
                        </DialogContentText>
                        <TextField
                            margin='dense'
                            id='name'
                            label='Никнейм стримера'
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
                            Зарегистрировать стримера
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default RegistrationStreamerForm
