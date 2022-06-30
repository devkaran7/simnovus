import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classes from "./Logout.module.css";

const Logout = () => {
  const history = useHistory();
  const logoutHandler = () => {
    sessionStorage.removeItem("jwtToken");
    history.push("/home");
  };
  return (
    <div className={classes.nav}>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName={classes.active}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/book-slot" activeClassName={classes.active}>
            Book a slot
          </NavLink>
        </li>
        <li>
          <button className="btn--flat" type="button" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
