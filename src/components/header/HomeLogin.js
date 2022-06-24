import { NavLink } from "react-router-dom";
import classes from "./HomeLogin.module.css";

const HomeLogin = () => {
  return (
    <div className={classes.nav}>
      <ul>
        <li>
          <NavLink to="/home" activeClassName={classes.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName={classes.active}>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default HomeLogin;
