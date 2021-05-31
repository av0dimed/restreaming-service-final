import { useSelector } from 'react-redux'
import LoginButtons from './LoginButtons'
import UserButton from './UserButton'

function UserPanel() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    return <>{isLoggedIn ? <UserButton /> : <LoginButtons />}</>
}

export default UserPanel
