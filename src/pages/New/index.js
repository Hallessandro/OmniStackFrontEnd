import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './style.css';

export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    //Toda vez q o valor de thumbnail mudar, a função é chamada
    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        const user_id = localStorage.getItem("user");
        await api.post('/spots', data, {
            headers: {user_id}
        });
        
        history.push("/dashboard");
    }

    return (
        <form onSubmit={handleSubmit}>

            <label 
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder="Nome da empresa"
                value={company}
                onChange={event => { setCompany(event.target.value) }} />

            <label htmlFor="company">TECNOLOGIAS * <span>(Separadas por vírgula)</span></label>
            <input
                id="company"
                placeholder="ReactJS, NodeJS, Angular"
                value={techs}
                onChange={event => { setTechs(event.target.value) }} />

            <label htmlFor="company">VALOR DA DIÁRIA <span>(Em branco para FREE)</span></label>
            <input
                id="company"
                placeholder="Preço da diária do spot"
                value={price}
                onChange={event => { setPrice(event.target.value) }} />

            <button className="btn" type="submit">Cadastrar</button>
        </form>
    )
}