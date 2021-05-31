var callback = null

export const basicResponseHandler = (response) => {
    if (!response.ok) {
        switch (response.status) {
            case 400:
                console.log('Error: ' + response)
                return response.text().then((text) => {
                    throw Error(text)
                })
            case 503:
                throw Error('Ошибка подключения к серверу')
            default:
                throw Error('Неизвестная ошибка')
        }
    }
    return response
}

export const basicErrorHandler = (error) => {
    if (error.name === 'TypeError') {
        callback('Превышено время ожидания ответа')
    } else {
        callback(error.message)
    }
}

export const setCallback = (_callback) => {
    callback = _callback
}
