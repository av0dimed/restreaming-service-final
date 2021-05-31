const isStreamerReducer = (state = false, action) => {
    switch (action.type) {
        case 'isStreamer':
            return true
        case 'isNotStreamer':
            return false
        default:
            return state
    }
}

export default isStreamerReducer
