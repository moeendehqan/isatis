import './login.css'
import {useState} from 'react'
import axios from 'axios'


const Login = (props) => {

    const [username, setUsername] = useState('')
    const handleUsername = (e) =>{setUsername(e.target.value)}

    const [password, setPassword] = useState('')
    const handlePassword = (e) =>{setPassword(e.target.value)}

    const [keylogin, setKeylogin] = useState('')
    const handleKeylogin = (e) =>{setKeylogin(e.target.value)}

    const [msg, setMsg] = useState('')

    const handleLogin = (e)=>{
        e.preventDefault();
        if(username.length<1){
            setMsg('نام کاربری را وارد کنید')
        }else if(password.length<1){
            setMsg('رمز عبور را وارد کنید')
        }else if(keylogin.length<1){
            setMsg('کلید را وارد کنید')
        }else{
        axios({
            method: 'post',
            url: "http://localhost:5000/api/login",
            data: {username:username, password:password, keylogin:keylogin}
        }).then((response)=>{
            if(response.data.res){
                props.handleModeApp('desk',username)
            }else{
                setMsg(response.msg)
            }

        }).catch((response)=>{
            console.log(response)
        })
    }

    }

    if(props.mode==='home'){
    return(
        <div className='login'>
            <div className='ent'>
                <div>
                    <img src={require('../../img/icon/login.png')} alt='login icon' className='icn'></img>
                    <h2>ورود</h2>
                </div>
                <form onSubmit={(e)=>handleLogin(e)}>
                    <label className='fld'>
                        <span>نام کاربری</span>
                        <input type='text' value={username} onChange={(e)=>handleUsername(e)}></input>
                    </label>
                    <label className='fld'>
                        <span>رمز عبور</span>
                        <input type='password' value={password} onChange={(e)=>handlePassword(e)}></input>
                    </label>
                    <label className='fld'>
                        <span>کلید</span>
                        <input type='text' value={keylogin} onChange={(e)=>handleKeylogin(e)}></input>
                    </label>
                    <button type='submit'>ورود</button>
                    
                </form>
                <p className='errmsg'>{msg}</p>

            </div>
            <div className='dtl'>
                <h2>رنـــد</h2>
                <h4>سامانه گزارش  دهی امور سهام</h4>
            </div>


        </div>
        )}
}

export default Login