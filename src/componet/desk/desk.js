import './desk.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Menu from './menu/menuright'

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

    const [menuright , setMenuright] = useState(true)
    const handleMenuright = () =>{setMenuright(!menuright)}

    const [viw , setViw] = useState('uploadfile')
    const handleViw = (v) =>{
        setViw(v)
    }
    console.log(viw)


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
                        نمایش
                    </div>
                    

                </main>
                
                
            </div>
        )
    }

}
export default Desk