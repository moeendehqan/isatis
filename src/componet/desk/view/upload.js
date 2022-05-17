import { useState } from 'react'
import axios from 'axios'


const Upload = (props) =>{
    const [filetrade, setFiletrade] = useState(null)
    const [isFaileTrade, setIsFaileTrade] = useState(false)
    const handlefiletrade = (e)=>{
        setFiletrade(e.target.files[0])
        setIsFaileTrade(true)
    }

    const [fileregister, setFileregister] = useState(null)

    const handleFormUpload = () =>{
        const formDataTrade = new FormData();
        formDataTrade.append('Trade',filetrade)
        axios({
            method: 'post',
            url: "http://localhost:5000/api/getfile",
            data: formDataTrade,
        }).then((response)=>{
            console.log(response.data.msg)
        }).catch((response)=>{
            console.log(response)
        })
    }


    if(props.viw==='upload'){
        return(
            <div className="upload">
                <img src={require('../../../img/icon/upload.png')} alt='upload icon'></img>
                <form onSubmit={(e)=>handleFormUpload(e)}>
                    <label>
                        <span> فایل  معاملات</span>
                        <input type='file' onChange={(e)=>handlefiletrade(e)}></input>
                    </label>
                    <label>
                    <span> فایل  رجیستر</span>
                        <input type='file' onChange={(e)=>setFileregister(e.target.file[0])}></input>
                    </label>
                    <button className='uplbtn' type='submit'>بارگذاری</button>
                </form>
            </div>
        )
    }
}

export default Upload