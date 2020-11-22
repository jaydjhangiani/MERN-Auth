import React,{useContext} from 'react'
import {useHistory} from 'react-router-dom'
import userContext from '../../context/UserContext'

function AuthOptions() {
    const  {userData,setUserData} = useContext(userContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token:undefined,
            user: undefined
        }
    )};
    localStorage.setItem("auth-token","")
    return (
        <nav className="authOptions">
            {
                userData.user ? 
                <>
                <span className="uname">{`Hey, ${userData.user.displayName}!`}</span>
                <button onClick={logout}>Log Out</button> 
                </>
                :
                <>
                <button onClick={register}>Register</button>
                <button onClick={login}>Log In</button>
                </>
            }
            
        </nav>
    )
}

export default AuthOptions
