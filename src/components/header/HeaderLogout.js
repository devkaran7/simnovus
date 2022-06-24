import classes from "./HeaderLogout.module.css";
import Logout from './Logout';

const HeaderLogout = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <h2>Simnovus</h2>
      </div>
      <Logout></Logout>
    </div>
  );
};

export default HeaderLogout;
