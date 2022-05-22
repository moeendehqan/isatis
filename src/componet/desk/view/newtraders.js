import { useEffect, useState } from "react"
import axios from 'axios'

const Newtraders = (props) =>{
    const user = props.user

    const [dataNewTraders, setDataNewTraders] = useState('')
    const handlenewtraders = ()=>{
        axios({
            method: 'post',
            url: "http://localhost:5000/api/newtraders",
            data: {username:user},
        }).then((response)=>{
            setDataNewTraders(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })}
        console.log(dataNewTraders)
        useEffect(handlenewtraders,[user])
    

    if(props.viw==='newtraders'){
        return(
            <div>
                جدید الورود
            </div>
        )
    }

}

export default Newtraders