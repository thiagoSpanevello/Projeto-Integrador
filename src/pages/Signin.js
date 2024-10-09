import React from 'react'
import '../styles/Signin.css'
function Signin() {
    return (
        <div className='addUser'>
            <h3>LOGIN</h3>
            <form className='addUserForm'>
                <div className='inputGroup'>
                    <label htmlFor='CNPJ'>CNPJ</label>
                    <input type='text' id='CNPJ' autoComplete='off' placeholder='XX.XXX.XXX/0001-XX' required />
                    <label htmlFor='Password'>Password</label>
                    <input type='password' id='Password' autoComplete='off' placeholder='Enter your password' />
                    <button type="submit" class="btn btn-primary">LOGIN</button>
                </div>
            </form>
            <div className='Signup'>
                <a className='createAccount'>Criar conta</a>
            </div>
        </div>
    )
}

export default Signin
