 import styles from "./Register.module.css";
 import {Link} from "react-router-dom";
 import Message from "../../Components/message"
 import {useState, useEffect} from "react"
 const Register = ()=>{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    return(
        <div id="register">
            <p className="subtitle">Cadastre-se para compartilhar suas ideias!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type="text" placeholder="Digite o seu username" onChange={(e)=> setName(e.target.value)} value={name} />
                </label>
                <label>
                    <span>Email:</span>
                    <input type="email" placeholder="Digite o seu email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                </label>
                <label>
                    <span>Senha:</span>
                    <input type="password" placeholder="Digite a sua senha" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                </label>
                <label>
                    <span>Confirme a sua senha:</span>
                    <input type="email" placeholder="Confirme a sua senha" onChange={(e)> setConfirmPassword(e.target.value)} value={confirmPassword}/>
                </label>
                <input type="submit" value="Cadastrar"/>
            </form>
        </div>
    )
 }

 export default Register;