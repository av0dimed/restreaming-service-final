import {IconButton, Menu, MenuItem} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {logout} from '../services/Auth'
import useStyles from '../Styles'

function UserButton() {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null)
    const isStreamer = useSelector((state) => state.isStreamer)
    const username = useSelector((state) => state.username)
    const isManager = useSelector((state) => state.isManager)
    const isAdmin = useSelector((state) => state.isAdmin)
    const classes = useStyles()
    const location = useLocation()

    const path = location.pathname === '/' ? '' : location.pathname

    const isLoggedIn = useSelector((state) => state.isLoggedIn)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLoggingOut = () => {
        setAnchorEl(null)
        logout(dispatch)
    }

    return (
        <>
            <div>
                <IconButton
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='primary'
                    className={classes.iconButton}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    {isStreamer && (
                        <MenuItem component={Link} to={`/${username}`} onClick={handleClose}>
                            Моя страница
                        </MenuItem>
                    )}
                    {isStreamer && (
                        <MenuItem component={Link} to='/streamerPanel' onClick={handleClose}>
                            Управление трансляцией
                        </MenuItem>
                    )}
                    {isManager && (
                        <MenuItem component={Link} to='/managerPanel' onClick={handleClose}>
                            Панель менеджера
                        </MenuItem>
                    )}
                    {isAdmin && (
                        <MenuItem component={Link} to='/adminPanel' onClick={handleClose}>
                            Панель администратора
                        </MenuItem>
                    )}
                    {isLoggedIn && (
                        <>
                            <MenuItem component={Link} to={'/subscriptions'} onClick={handleClose}>
                                Мои подписки
                            </MenuItem>
                            <MenuItem component={Link} to={`${path}/changePassword`} onClick={handleClose}>
                                Сменить пароль
                            </MenuItem>
                        </>
                    )}
                    <MenuItem onClick={handleLoggingOut}>Выйти</MenuItem>
                </Menu>
            </div>
        </>
    )
}

export default UserButton
