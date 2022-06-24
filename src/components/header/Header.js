import classes from "./Header.module.css";
import HomeLogin from "./HomeLogin";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <h2>Simnovus</h2>
      </div>
      <HomeLogin></HomeLogin>
    </div>
  );
};

export default Header;
