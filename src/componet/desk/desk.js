import './desk.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Menu from './menu/menuright'
import Upload from './view/upload'
import Toptraders from './view/toptrader'
import Newtraders from './view/newtraders'
import Istgah from './view/istgah'

const Desk = (props) =>{

    const user = props.user
    const [symbol ,setSymbol] = useState('')

    const handleSymbolGet = () =>{
        axios({
            method: 'post',
            url: "http://156.253.5.210:5000/api/userfromsymbol",
            data: {username:user},
            config : {headers:{'content-type': 'multipart/form-data'}}
        }).then((response)=>{
            setSymbol(response.data.symbol)
        }).catch((response)=>{
            console.log(response)
        })}
    useEffect(handleSymbolGet,[user])

    const [viw , setViw] = useState('upload')
    const handleViw = (v) =>{
        setViw(v)
    }

    if(props.mode==='desk'){
        return(
            <div className='desk'>
                <nav className='title'>
                    <h3>{symbol}</h3>
                    <h4>محرمانه</h4>
                </nav>
                <main>
                    <Menu handleViw={handleViw} viw={viw} />
                    <div className='viw'>
                        <Upload viw={viw} user={user}/>
                        <Toptraders viw={viw} user={user}/>
                        <Newtraders viw={viw} user={user}/>
                        <Istgah viw={viw} user={user} />
                    </div>
                    

                </main>
                
                
            </div>
        )
    }

}
export default Desk