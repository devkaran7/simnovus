import { decodeToken } from "react-jwt";

const isAuth = () =>{
  const token = sessionStorage.getItem('jwtToken');
  if(!token){
    return false;
  }
  const myDecodedToken = decodeToken(token);
  if(!myDecodedToken){
      sessionStorage.removeItem('jwtToken');
      return false;
  }
  return true;
};

export default isAuth;