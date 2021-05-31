const streamUrlReducer = (state = '', action) => {
    switch (action.type) {
        case 'changeStreamUrl':
            return action.url
        default:
            return state
    }
}

export default streamUrlReducer
