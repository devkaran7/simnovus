import LoginForm from "../components/login/LoginForm";
import { useHistory } from "react-router-dom";
import isAuth from "../isAuth";

const Login = (props) => {
  const history = useHistory();
  if(isAuth()){
    history.replace('/dashboard');
    return;
  }
  
  return <LoginForm></LoginForm>
};

export default Login;