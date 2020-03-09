import React, { useState, useEffect } from 'react'

//import api from '../../services/api';
import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
//import api from '../../services/api';

import GlucoseItem from '../../components/GlucoseItem/index'
import api from '../../services/api';
import AddItem from '../../components/AddGlucoseItem';

function LoggedHome() {

    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState(String)
    const [roda, setRoda] = useState(Boolean)
    const [newValue, setNewValue] = useState(String)

    const id = getId();

    //let i = 0;

    useEffect(() => {
        const id = getId();
        async function loadGlucoses() {

            const response = await api.get(`/get_glucose/${id}`);

            setGlucoses(response.data);

        }

        loadGlucoses()

        setRoda(false)

    }, [roda]);

    async function handleAddGlucose() {
        //e.preventDefault();

        const response = await authApi.post(`/insert_glucose/${id}`, {
            value
        });

        // i++;

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true)


    }

    async function updateTask(glucoseId) {

        await authApi.put(`/update_glucose/${id}/${glucoseId}`, {
            valor: newValue
        })
            .then((response) => {
                console.log(newValue)
                setGlucoses([...glucoses, response.data]);
                console.log(response.data)
                setRoda(true)
                setNewValue('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function deleteTask(glucoseId) {

        glucoses.splice(glucoseId, 1);
        const response = await authApi.delete(`/delete_glucose/${id}/${glucoseId}`)

        setGlucoses([...glucoses, response.data]);

        setRoda(true);

    }

    /*async function handlePoupupForm(e) {
        e.preventDefault();

        await authApi.post(`/login/insert_glucose/${id}`, {
            value
        })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })

    }*/

    return (
        <div id="app">
            <AddItem
            onChange={e => setValue(e.target.value)}
            value={value}
            handleAdd={handleAddGlucose}
            />
            <div>
                {
                    glucoses.map((item) => (
                        <GlucoseItem
                            key={Object.values(item)}
                            glucose={item}
                            onDelete={() => deleteTask(item._id)}
                            save={() => updateTask(item._id)}
                            onChange={e => setNewValue(e.target.value)}
                            value={newValue}
                        />
                    ))
                }

            </div>
        </div>
    )
}


export default LoggedHome;

/*

import React, { useState, useEffect } from 'react'

//import api from '../../services/api';
import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
//import api from '../../services/api';

import GlucoseItem from '../../components/GlucoseItem/index'
import api from '../../services/api';

const LoggedHome = () => {

    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState('')
    const [roda, setRoda] = useState(Boolean)
    const [newValue, setNewValue] = useState(String)

    const id = getId();

    //let i = 0;

    useEffect(() => {
        const id = getId();
        async function loadGlucoses() {

            const response = await api.get(`/get_glucose/${id}`);

            setGlucoses(response.data);

        }

        loadGlucoses()

        setRoda(false)

    }, [roda]);

    async function handleAddGlucose(e) {
        e.preventDefault();

        const response = await authApi.post(`/insert_glucose/${id}`, {
            value
        });

        // i++;

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true)


    }

    async function updateTask(glucoseId) {

        await authApi.put(`/update_glucose/${id}/${glucoseId}`, {
            valor: newValue
        })
            .then((response) => {
                console.log(newValue)
                setGlucoses([...glucoses, response.data]);
                console.log(response.data)
                setRoda(true)
                setNewValue('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function deleteTask(glucoseId) {

        glucoses.splice(glucoseId, 1);
        const response = await authApi.delete(`/delete_glucose/${id}/${glucoseId}`)

        setGlucoses([...glucoses, response.data]);

        setRoda(true);

    }

    return (
        <div id="app">
            <aside>
                <h1>Informe a Glicemia</h1>
                <form onSubmit={handleAddGlucose}>
                    <div id="boot" >
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="glucose" ></label>
                        <input
                            placeholder="Glicemia *"
                            className="Login-Field"
                            name="glucose"
                            id="glucose"
                            required value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Adicionar</button>
                </form>
            </aside>
            <div>
                {
                    glucoses.map((item) => (
                        <GlucoseItem
                            key={Object.values(item)}
                            glucose={item}
                            value={newValue}
                            onChange={e => setNewValue(e.target.value)}
                            save={() => updateTask(item._id)}
                            onDelete={() => deleteTask(item._id)}
                        />
                    ))
                }
            </div>
            <div>

            </div>
        </div>
    )
}

export default LoggedHome; */