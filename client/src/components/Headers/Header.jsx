import { useContext, Fragment,useState} from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/delete.svg";
import Cart from "./icon/car.svg";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu,setMenu] = useState(false)

  const logoutUser = async () => {
    await axios.get("/user/logout");
    //  setIsAdmin(false)
    //  setIsLogged(false) 
   localStorage.removeItem('firstLogin')  
    window.location.href = "/"; // TODO: PROBAR CON NAVIGATION DE REACT ROUTER DOM
  };

  const adminRouter = () => {
    return (
      <Fragment>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </Fragment>
    );
  };

  const loggedRouter = () => {
    return (
      <Fragment>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </Fragment>
    );
  };


  
  const styleMenu = {
    left: menu ? 0 : "-100%"
  }

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Online Shop"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login | Register</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img className="menu" src={Close} alt="" width="22" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}
