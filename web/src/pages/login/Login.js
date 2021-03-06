import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import { login, setId } from '../../services/auth';

import diabetesImg from '../../assets/diabetesM.png';
import logoImg from '../../assets/carbLogo.png';

import './Login.css';

const Login = ({ logado, setLogado }) => {

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/login', {
            email,
            password
        })
            .then(response => {
                login(response.data.token)
                setLogado(true)
                setId(response.data.user._id);
                setUsers([...users, response.data]);
            })
            .catch(error => {
                console.log(error);

                const element = <div className="alert alert-danger" role="alert">
                    Email e/ou Senha incorreto!
                                </div>

                ReactDOM.render(element, document.getElementById("login-err"));
            });

        setEmail('');
        setPassword('');
    };

    if (logado) {
        return <Redirect to="/profile" />
    }

    return (
        <div className="logon-container">
            <section className="form" >
                <img src={logoImg} alt="Logo Carb" />

                <form onSubmit={handleSubmit} >
                    <h1>Entre para começar</h1>
                    <div id="login-err" ></div>
                    <input
                        placeholder="Email"
                        name="email"
                        required value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit" >Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#D45812" />
                        Cadastre-se
                    </Link>
                </form>
            </section>

            <img src={diabetesImg} alt="Diabetes" />
        </div>
    )
}


export default Login;




/*
import React, { useState } from 'react'
import api from '../../services/api'

import ReactDOM from 'react-dom';

import './Login.css'
import { login, setId } from '../../services/auth';

import { Link, Redirect } from 'react-router-dom';

const Login = ({logado, setLogado}) => {

    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/login', {
            email,
            password
        })
            .then(response => {
                login(response.data.token)
                setLogado(true)
                setId(response.data.user._id);
                setUsers([...users, response.data]);
            })
            .catch(error => {
                console.log(error);

                const element = <div className="alert alert-danger" role="alert">
                                    Email e/ou Senha incorreto!
                                </div>

                ReactDOM.render(element, document.getElementById("boot"));
            });

        setEmail('');
        setPassword('');
    };

    if (logado) {
        return <Redirect to="/home" />
    }

    return (
        <div id="app">
            <aside>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div id="boot" >
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="email" ></label>
                        <input
                            placeholder="Email *"
                            className="Login-Field"
                            name="email"
                            id="email"
                            required value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="password" ></label>
                        <input
                            type="password"
                            placeholder="Password *"
                            className="Login-Field"
                            name="password"
                            id="password"
                            required value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Entrar</button>
                </form>
                <Link className="forgot_password" to="/forgot_password">
                    <p>Esqueci minha senha</p>
                </Link>
            </aside>
        </div>
    )
}


export default Login
*/