import React, { useContext, useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../../context/UserContext'
//import TodoContext from '../../context/TodoContext'
import Axios from 'axios'

function Home() {
    const {userData} = useContext(UserContext)
    //const [todo,setTodo] = useState([])
    const history  = useHistory();
    useEffect(() => {
        if(!userData.user){
            history.push('/login');
        }
    })

    return (
        <div className="page">
            <h1>Home</h1>
        </div>
    )
}

export default Home
