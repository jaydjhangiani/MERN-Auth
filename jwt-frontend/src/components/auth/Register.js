import React, { useState ,useContext,} from 'react'
import {useHistory} from 'react-router-dom'
import Axios from 'axios'
import UserContext from '../../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

function Register() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [displayName,setDisplayName] = useState('');
    const {setUserData} = useContext(UserContext);
    const [error,seterror] = useState('');
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault();
        try{
            const newUser = {email,password,passwordCheck,displayName};
            await Axios.post("http://localhost:5000/users/register",newUser);
            const loginRes = await Axios.post("http://localhost:5000/users/login",
                {email,password}
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
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => seterror(undefined)}/>}
            <form onSubmit={submit} className="form">
                <label htmlFor="register-email">Email</label>
                <input type="email" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="register-password">Password</label>
                <input type="password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder="Verify Password" alue={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
                <label htmlFor="register-displayName">Diplay Name</label>
                <input type="text" id="register-displayName" alue={displayName} onChange={(e) => setDisplayName(e.target.value)}/>

                <input type="submit" value="Resgister"/>
            </form>
        </div>
    )
}

export default Register
