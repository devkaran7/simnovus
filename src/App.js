import { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HeaderLogout from "./components/header/HeaderLogout";
import BookSlot from "./pages/BookSlot";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"> </Redirect>
        </Route>
        <Route path="/home">
          <Header />
          <Home> </Home>
        </Route>
        <Route path="/login">
          <Header />
          <Login />
        </Route>
        <Route path="/dashboard">
          <HeaderLogout> </HeaderLogout> <Dashboard> </Dashboard>
        </Route>
        <Route path='/book-slot'>
        <HeaderLogout> </HeaderLogout> <BookSlot></BookSlot>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
