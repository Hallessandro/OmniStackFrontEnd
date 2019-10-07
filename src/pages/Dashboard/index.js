import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

export default function Dashboard(){
    //Como spots vem do back como uma lista, o array vazio serve para iniciar o obj como uma lista
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem("user");
            const response = await api.get("/dashboard", {
                headers: {user_id}
            });

            console.log(response.data);
            setSpots(response.data);
        }

        loadSpots();
    }, []);

    return (
        <div>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}></header>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'FREE'}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">
                    Cadastrar Novo Spot
                </button>
            </Link>
        </div>
    )
}