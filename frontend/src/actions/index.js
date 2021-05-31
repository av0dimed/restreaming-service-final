const loggedIn = () => {
    return {
        type: 'loggedIn',
    }
}

const loggedOut = () => {
    return {
        type: 'loggedOut',
    }
}

const isAdmin = () => {
    return {
        type: 'isAdmin',
    }
}

const isNotAdmin = () => {
    return {
        type: 'isNotAdmin',
    }
}

const isManager = () => {
    return {
        type: 'isManager',
    }
}

const isNotManager = () => {
    return {
        type: 'isNotManager',
    }
}

const isStreamer = () => {
    return {
        type: 'isStreamer',
    }
}

const isNotStreamer = () => {
    return {
        type: 'isNotStreamer',
    }
}

const changeStreamUrl = (url) => {
    return {
        type: 'changeStreamUrl',
        url: url,
    }
}

const changeUsername = (username) => {
    return {
        type: 'changeUsername',
        username,
    }
}

export {
    loggedIn,
    loggedOut,
    isAdmin,
    isNotAdmin,
    isManager,
    isNotManager,
    isStreamer,
    isNotStreamer,
    changeStreamUrl,
    changeUsername,
}
