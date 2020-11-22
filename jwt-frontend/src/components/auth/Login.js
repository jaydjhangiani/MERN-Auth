import React, { useState ,useContext,} from 'react'
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
import UserContext from '../../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {setUserData} = useContext(UserContext);
    const [error,seterror] = useState('');
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();
        try{
            const LoginUser = {email,password}
            const loginRes = await Axios.post("http://localhost:5000/users/login",
                LoginUser
            );
            setUserData({
                token:loginRes.data.token,
                user:loginRes.data.user,
            })
            localStorage.setItem("auth-token",loginRes.data.token)
            history.push("/")
        }
        catch(err){
            err.response.data.msg && seterror(err.response.data.msg) 
        }
    }
    return (
        <div className ="page">
            <h2>Login</h2>
            {error && <ErrorNotice message={error} clearError={() => seterror(undefined)}/>}
            <form onSubmit={submit} className="form">
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="login-password">Password</label>
                <input type="password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default Login
