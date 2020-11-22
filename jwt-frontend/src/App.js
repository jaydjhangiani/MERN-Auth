import React, { useState ,useEffect} from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom"
import './App.css';
import Axios from 'axios';
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'
import UserContext from './context/UserContext'
import Footer from './components/layout/Footer';


function App() {
  const [userData,setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null){
        localStorage.setItem("auth-token","");
        token = "";
      }
      const tokenResponse = await Axios.post("http://localhost:5000/users/tokenIsValid",null,{
        headers:{"x-auth-token":token}
      })
      //console.log(tokenResponse.data,token)
      if (tokenResponse.data){
        let userRes = await Axios.get("http://localhost:5000/users/",{headers:{"x-auth-token": token},
      })
      console.log(userRes)
      setUserData({
        token,
        user: userRes.data
      })
      }
    }
    checkLoggedIn();
  },[])

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData,setUserData}}>
        <Header/>
        <div className = "container">
        <Switch>
            <Route exact path="/" component = {Home} />
            <Route path="/login" component = {Login} />
            <Route path="/register" component = {Register} />
          </Switch>
        </div>
        </UserContext.Provider>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
