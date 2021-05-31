const isManagerReducer = (state = false, action) => {
    switch (action.type) {
        case 'isManager':
            return true
        case 'isNotManager':
            return false
        default:
            return state
    }
}

export default isManagerReducer
