const usernameReducer = (state = '', action) => {
    switch (action.type) {
        case 'changeUsername':
            return action.username
        default:
            return state
    }
}

export default usernameReducer
