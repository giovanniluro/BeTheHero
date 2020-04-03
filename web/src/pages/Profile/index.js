import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './style.css'

export default function Profiles() {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const [del, setDel] = useState(true);
    const history = useHistory();

    useEffect(() => {
        api.get('/profile', {
            headers: {
                authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId, del]);
    
    async function handleDelete(id){
        try{
            await api.delete(`/incidents/${id}`, {headers:{
                authorization: ongId
            }});
            setDel(!del);
        } catch(err) {
            alert(err);
        }
    }

    async function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo" />
                <span>Bem vinda, {ongName} </span>
                <Link className='button' to='incidents/new'>Cadastrar novo caso</Link>
                <button type='button' onClick={handleLogout}>
                    <FiPower size={18} color='#E02041' />
                </button>
            </header>

            <h1> Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDelete(incident.id)}>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}