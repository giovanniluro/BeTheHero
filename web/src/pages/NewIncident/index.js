import React, {useState} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './style.css';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('');
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            await api.post('/incidents', {title, description, value, }, {headers:{authorization: localStorage.getItem('ongId')}});
            history.push('/profile');
        } catch(err){
            alert(err);
        }
    }

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Logo" />
                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                </p>
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
            </section>
            <form onSubmit = {handleSubmit}>
                <input type="text" placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Descrição"value={description} onChange={e => setDescription(e.target.value)}/>
                <input type="text" placeholder="Valor em reais"value={value} onChange={e => setValue(e.target.value)}/>
                
                <button className="button" type="Submit">Cadastrar</button>
            </form>
        </div>
    </div>
);
}
