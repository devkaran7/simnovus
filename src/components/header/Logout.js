import { useHistory } from "react-router-dom";
import classes from "./Logout.module.css";

const Logout = () => {
  const history = useHistory();
  const logoutHandler = () => {
    sessionStorage.removeItem('jwtToken');
    history.push('/home');
  };
  return (
    <div className={classes.nav}>
      <ul>
        <li>
          <button className="btn" type="button" onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Logout;
