import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
import axios from "axios";

function Signin() {
  const [conta, setConta] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      conta,
      senha: password,
    };

    try {
      const response = await axios.post("http://localhost:3001/login", data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (error) {
      toast.error("Erro ao tentar fazer login!");
      console.error(
        "Erro ao fazer login:",
        error.response?.data || error.message
      );
      setMessage(error.response?.data.message || "Erro ao fazer login");
    }
  };

  return (
    <div>
      <div className="bgImage"></div>
      <div className="imageBox"></div>
      <div className="addUser">
        <h3>LOGIN</h3>
        <form className="addUserForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="Conta">Conta</label>
            <input
              type="text"
              autoComplete="off"
              placeholder="admin@empresa"
              value={conta}
              onChange={(e) => setConta(e.target.value)}
              required
            />
            <label htmlFor="Password">Senha</label>
            <input
              type="password"
              id="Password"
              autoComplete="off"
              placeholder="digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {message && <p className="errorMessage">{message}</p>}
            <button type="submit" className="btn btn-primary logbtn">
              LOGIN
            </button>
          </div>
        </form>
        <div className="Signup">
          <a className="createAccount" href="/Signup">
            Criar conta
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
