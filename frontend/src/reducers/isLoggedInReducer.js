const isLoggedInReducer = (state = false, action) => {
    switch (action.type) {
        case 'loggedIn':
            return true
        case 'loggedOut':
            return false
        default:
            return state
    }
}

export default isLoggedInReducer
