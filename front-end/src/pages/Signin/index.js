import React, { useState } from 'react';
import './style.css';
import axios from 'axios';

function Signin() {
    const [conta, setConta] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            conta,
            senha: password, // Certifique-se de que o back-end espera o campo "senha"
        };

        try {
            const response = await axios.post('http://localhost:3001/login', data);
            // Supondo que o back-end retorne um token ou confirmação de sucesso
            alert("Login bem-sucedido!");
            console.log("Resposta do servidor:", response.data);
            // Redirecione o usuário ou salve o token no localStorage
            localStorage.setItem('token', response.data.token); // Exemplo de armazenamento
            window.location.href = "/home"; // Redirecionar para a página inicial
        } catch (error) {
            console.error("Erro ao fazer login:", error.response?.data || error.message);
            setMessage(error.response?.data.message || "Erro ao fazer login");
        }
    };

    return (
        < div >
            <div className='bgImage'></div>
            <div className='imageBox'></div>
            <div className='addUser'>
                <h3>LOGIN</h3>
                <form className='addUserForm' onSubmit={handleSubmit}>
                    <div className='inputGroup'>
                        <label htmlFor='Conta'>Conta</label>
                        <input
                            type='text'
                            autoComplete='off'
                            placeholder='admin@empresa'
                            value={conta}
                            onChange={(e) => setConta(e.target.value)}
                            required
                        />
                        <label htmlFor='Password'>Senha</label>
                        <input
                            type='password'
                            id='Password'
                            autoComplete='off'
                            placeholder='digite sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {message && <p className='errorMessage'>{message}</p>}
                        <button type="submit" className="btn btn-primary logbtn">LOGIN</button>
                    </div>
                </form>
                <div className='Signup'>
                    <a className='createAccount' href='/Signup'>Criar conta</a>
                </div>
            </div>
        </div >
    );
}

export default Signin;
