import { useRef, useState } from 'react'
import axios from 'axios'


const Upload = (props) =>{

    const filetradeRef = useRef(null)
    const [filetrade, setFiletrade] = useState(null)
    const [isFileTrade, setIsFileTrade] = useState(false)
    const handlefiletrade = (e)=>{
        setFiletrade(e.target.files[0])
        setIsFileTrade(true)
    }

    const fileregisterRef = useRef(null)
    const [fileregister, setFileregister] = useState(null)
    const [isFileRegister, setIsFileRegister] = useState(false)
    const handlefileregister = (e) =>{
        setFileregister(e.target.file[0])
        setIsFileRegister(true)
    }


    const [msg, setMsg] = useState('')

    const typeAllowe = ['xlsx']
    if(isFileTrade){
        const typetrade = filetrade.name.split('.')[filetrade.name.split('.').length -1]
        console.log(typetrade)
    }

    const handleFormUpload = (e) =>{
        e.preventDefault();
        if(isFileTrade){
            if(isFileRegister){
                const formData = new FormData();
                formData.append('Trade',filetrade)
                formData.append('Register',fileregister)
                axios({
                    method: 'post',
                    url: "http://localhost:5000/api/getfile",
                    data: formData,
                }).then((response)=>{
                    console.log(response.data.msg)
                }).catch((response)=>{
                    console.log(response)
                })
            }else{
                setMsg('فایل رجیستر را وارد کنید')
                fileregisterRef.current.focus()
            }

        }else{
            setMsg('فایل معاملات را وارد کنید')
            filetradeRef.current.focus()
        }
        

    }


    if(props.viw==='upload'){
        return(
            <div className="upload">
                <img src={require('../../../img/icon/upload.png')} alt='upload icon'></img>
                <form onSubmit={(e)=>handleFormUpload(e)}>
                    <label>
                        <span> فایل  معاملات</span>
                        <input type='file' onChange={(e)=>handlefiletrade(e)} ref={filetradeRef}></input>
                    </label>
                    <label>
                    <span> فایل  رجیستر</span>
                        <input type='file' onChange={(e)=>handlefileregister(e)} ref={fileregisterRef}></input>
                    </label>
                    <button className='uplbtn' type='submit'>بارگذاری</button>
                    <p id='msgupload'>{msg}</p>
                </form>
            </div>
        )
    }
}

export default Upload