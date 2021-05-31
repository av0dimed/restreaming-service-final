import { useEffect, useState } from 'react'

function Testt() {
    const [state, setState] = useState({
        name: 'нихуя тут нет',
        lala: 'а тут пизда',
        loaded: true,
    })

    useEffect(() => {
        fetch('http://127.0.0.1:8081/lala')
            .then((res) => res.text())
            .then((data) => {
                setState((prev) => ({
                    ...prev,
                    name: data,
                }))
            })
    }, [state.loaded])

    return (
        <div>
            <h1>Список покупок для {state.name}</h1>
            <ul>
                <li>Instagram</li>
                <li>WhatsApp</li>
                <li>Oculus</li>
                <li>{state.lala}</li>
            </ul>
            <button onClick={() => setState((prev) => ({ ...prev, loaded: !prev.loaded }))}>Тригернуть</button>
        </div>
    )
}

export default Testt
