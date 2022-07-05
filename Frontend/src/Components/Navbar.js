import {NavLink, Link} from 'react-router-dom'
import styles from "./Navbar.module.css"

const Navbar = () => {
    const user = false;

  return (
    <div>
        <NavLink to="/">Share Ideas!</NavLink>

        <ul>
            <li>
                <NavLink to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/register">Cadastrar</NavLink>
            </li>
            <li>
                <NavLink to="/login">Entrar</NavLink>
            </li>
            
            {/* Mudar os navLinks de createpost e dashbord para estarem dentro da mesma verificação de user, evitando a duplicação da verificação*/}
            {user && (
                 <li>
                    <NavLink to="/createpost">Cadastrar</NavLink>
                </li>
            )
            }
            { user && (
                <li>
                    <NavLink to="/dashbord">Dashbord</NavLink>
                </li>
            )
            }

            {user&& (
                <button>Logout</button>
            )}
        </ul>

    </div>
  )
}

export default Navbar