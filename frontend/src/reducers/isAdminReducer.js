const isAdminReducer = (state = false, action) => {
    switch (action.type) {
        case 'isAdmin':
            return true
        case 'isNotAdmin':
            return false
        default:
            return state
    }
}

export default isAdminReducer
