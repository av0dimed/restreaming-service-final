const tags = [
    {
        tag: 'Киберспорт',
        color: '#f58eb4',
    },
    {
        tag: 'Компьютерные игры',
        color: '#f7a1c6',
    },
    {
        tag: 'Научпоп',
        color: '#ffb699',
    },
    {
        tag: 'Образование',
        color: '#f4bdb8',
    },
    {
        tag: 'Хобби',
        color: '#cdc2eb',
    },
    {
        tag: 'DIY',
        color: '#d7feeb',
    },
    {
        tag: 'Арт',
        color: '#ffde85',
    },
    {
        tag: 'Музыка',
        color: '#ffec9f',
    },
    {
        tag: 'Еда',
        color: '#d0e1ff',
    },
    {
        tag: 'Спорт',
        color: '#e0ffd0',
    },
    {
        tag: 'Общение',
        color: '#caf1ff',
    },
    {
        tag: 'Настолки',
        color: '#cdfac9',
    },
    {
        tag: 'Лайфстайл',
        color: '#bac6ff',
    },
    {
        tag: 'Красота',
        color: '#FAC9FA',
    },
]

export function getTagStyle(tagName) {
    var tagObj = tags.find((obj) => obj.tag === tagName)
    if (tagObj === undefined) {
        return null
    } else {
        return {
            backgroundColor: tagObj.color,
            color: '#000000',
        }
    }
}

export const getTags = () => {
    return tags
}
