import './desk.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Desk = (props) =>{
    const user = props.user
    const [symbol ,setSymbol] = useState('')

    const handleSymbolGet = () =>{
        axios({
            method: 'post',
            url: "http://localhost:5000/api/userfromsymbol",
            data: {username:user}
        }).then((response)=>{
            setSymbol(response.data.symbol)
        }).catch((response)=>{
            console.log(response)
        })}
    useEffect(handleSymbolGet,[user])


    if(props.mode==='desk'){
        return(
            <div className='desk'>
                <nav className='title'>
                    <h3>{symbol}</h3>
                    <h4>محرمانه</h4>
                </nav>
                
            </div>
        )
    }

}
export default Desk