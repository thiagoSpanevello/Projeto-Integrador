import React from 'react'
import './style.css'

function Signin() {
    return (
        < div >
            <div className='bgImage'>
            </div>
            <div className='imageBox'>
            </div>
            <div className='addUser'>
                <h3>LOGIN</h3>
                <form className='addUserForm'>
                    <div className='inputGroup'>
                        <label htmlFor='CNPJ'>Usuário</label>
                        <input type='text' id='CNPJ' autoComplete='off' placeholder='admin@empresa' required />
                        <label htmlFor='Password'>Senha</label>
                        <input type='password' id='Password' autoComplete='off' placeholder='digite sua senha' />
                        <button type="submit" class="btn btn-primary logbtn">LOGIN</button>
                    </div>
                </form>
                <div className='Signup'>
                    <a className='createAccount' href='/Signup'>Criar conta</a>
                </div>
            </div>
        </div >
    )
}

export default Signin
