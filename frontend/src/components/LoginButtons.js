import { Button, ButtonGroup } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import useStyles from '../Styles'

function LoginButtons() {
    const classes = useStyles()
    const location = useLocation()
    const path = location.pathname === '/' ? '' : location.pathname

    return (
        <>
            <ButtonGroup variant='text'>
                <Button component={Link} to={`${path}/login`} color='primary'>
                    Вход
                </Button>
                <Button component={Link} to={`${path}/register`} color='secondary'>
                    Регистрация
                </Button>
            </ButtonGroup>
        </>
    )
}

export default LoginButtons
