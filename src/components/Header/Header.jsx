import { NavLink } from "react-router-dom"
import "./Header.css"

const Header = () => {
  return (
    <header className="flex" >
      <nav className="flex" >
        <NavLink className="fg-nav-link" to="/">Home</NavLink>
        <NavLink className="fg-nav-link" to="/prevision">Previsión</NavLink>
        <NavLink className="fg-nav-link" to="/buscador">Buscador</NavLink>

      </nav>
    </header>
  )
}

export default Header