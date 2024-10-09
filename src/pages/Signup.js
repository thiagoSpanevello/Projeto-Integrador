import React, { useState } from 'react'
import "../styles/Signup.css"
function Signup() {
    const [CNPJ, setCNPJ] = useState("");
    const [nome, setNome] = useState("admin@");
    function maskCNPJ(value) {
        value = value.replace(/\D/g, ''); // Remove tudo que não for número
        // Máscara de CNPJ (00.000.000/0000-00)
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        return value;
    }

    const handleChange = (e) => {
        const valor = e.target.value;
        let text = valor.split(' ')[0];
        let a = "admin@";
        text = a + text;
        setNome(text);
    }


    return (
        < div >
            <div className='bgImage'>
            </div>
            <div className='imageBox'>
            </div>
            <div className='addUser'>
                <h3>Cadastro</h3>
                <form className='addUserForm'>
                    <div className='inputGroup'>
                        <label htmlFor='CNPJ'>CNPJ</label>
                        <input type='text' id='CNPJ' autoComplete='off' placeholder='XX.XXX.XXX/0001-XX' value={CNPJ} maxLength={18} onChange={(e) => setCNPJ(maskCNPJ(e.target.value))} required />
                        <label htmlFor='CNPJ'>Nome da empresa</label>
                        <input type='text' id='Name' autoComplete='off' placeholder='nome da empresa' required onChange={handleChange} />
                        <label htmlFor='Conta'>Conta</label>
                        <input type='text' id='Conta' autoComplete='off' disabled value={nome} />
                        <label htmlFor='Password'>Senha</label>
                        <input type='password' id='Password' autoComplete='off' placeholder='enter your password' required />
                        <label htmlFor='Password'>Confirmar senha</label>
                        <input type='password' id='ConfirmPassword' autoComplete='off' placeholder='enter your password' required />
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Signup
