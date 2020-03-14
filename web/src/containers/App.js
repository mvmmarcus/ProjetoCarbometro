import React, { useState, useEffect } from 'react';
import Routes from '../components/Routes'

import './App.css'

const App = () => {

    //const [token, setToken] = useState(false);

    const [logado, setLogado] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("user-token")) {
            setLogado(true)
        } else {
            setLogado(false)
        }

    }, [])

    /*useEffect(() => {
        setToken(!!localStorage.getItem("user-token"))
    }, [])*/

    return (
        <main className="App">
            <Routes setLogado={setLogado} logado={logado} />
        </main>
    )

}
export default App
