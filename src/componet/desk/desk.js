import './desk.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Menu from './menu/menuright'
import Upload from './view/upload'
import Toptraders from './view/toptrader'

const Desk = (props) =>{

    const user = props.user
    const [symbol ,setSymbol] = useState('')

    const handleSymbolGet = () =>{
        axios({
            method: 'post',
            url: "http://localhost:5000/api/userfromsymbol",
            data: {username:user},
            config : {headers:{'content-type': 'multipart/form-data'}}
        }).then((response)=>{
            setSymbol(response.data.symbol)
        }).catch((response)=>{
            console.log(response)
        })}
    useEffect(handleSymbolGet,[user])

    const [menuright , setMenuright] = useState(true)
    const handleMenuright = () =>{setMenuright(!menuright)}

    const [viw , setViw] = useState('Toptraders')
    const handleViw = (v) =>{
        setViw(v)
    }

    if(props.mode==='desk'){
        return(
            <div className='desk'>
                <nav className='title'>
                    <img src={require('../../img/icon/menuhmb.png')} alt='icon menu' onClick={handleMenuright}></img>
                    <h3>{symbol}</h3>
                    <h4>محرمانه</h4>
                </nav>
                <main>
                    <Menu menuright={menuright} handleViw={handleViw}/>
                    <div className='viw'>
                        <Upload viw={viw} user={user}/>
                        <Toptraders viw={viw} user={user}/>
                    </div>
                    

                </main>
                
                
            </div>
        )
    }

}
export default Desk