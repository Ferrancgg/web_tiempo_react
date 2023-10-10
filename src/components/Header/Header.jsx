import { NavLink } from "react-router-dom"
import "./Header.css"

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/prevision">Previsión</NavLink>
        <NavLink to="/buscador">Buscador</NavLink>

      </nav>
    </header>
  )
}

export default Header