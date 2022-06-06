import { useRef, useState } from 'react'
import axios from 'axios'


const Upload = (props) =>{
    const [disply, setDisply] = useState(['dnone',''])

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
        setFileregister(e.target.files[0])
        setIsFileRegister(true)
    }


    const [msg, setMsg] = useState('')

    const typeAllowe = ['xlsx','csv']

    if(isFileTrade){
        const typetrade = (filetrade.name.split('.')[filetrade.name.split('.').length -1])
        const alloweTrade = typeAllowe.includes(typetrade)
        console.log(alloweTrade)
    }
    

    const handleFormUpload = (e) =>{
        e.preventDefault();
        if(!isFileTrade){
            setMsg('فایل معاملات را وارد کنید')
            filetradeRef.current.focus()
        }else if(!isFileRegister){
                setMsg('فایل رجیستر را وارد کنید')
                fileregisterRef.current.focus()
        }else{
            const typetrade = (filetrade.name.split('.')[filetrade.name.split('.').length -1])
            const alloweTrade = typeAllowe.includes(typetrade)

            const typeregister = (fileregister.name.split('.')[fileregister.name.split('.').length -1])
            const alloweRegister = typeAllowe.includes(typeregister)

            if(!alloweTrade){
                setMsg('نوع فایل معاملات مجاز نیست')
                filetradeRef.current.focus()
            }else if(!alloweRegister){
                setMsg('نوع فایل رجیستر مجاز نیست')
                fileregisterRef.current.focus()
            }else{
                setMsg('')
                setDisply(['','dnone'])
                const formData = new FormData();
                formData.append('Trade',filetrade)
                formData.append('Register',fileregister)
                formData.append('user',props.user)
                axios({
                    method: 'post',
                    url: "http://156.253.5.210:5000/api/getfile",
                    data: formData,
                    config: {headers:{'content-type': 'multipart/form-data'}}
                }).then((response)=>{
                    setMsg(response.data.msg)
                    setDisply(['dnone',''])
                }).catch((response)=>{
                    console.log(response)
                    setDisply(['dnone',''])
                })
            }
        }
    }




    if(props.viw==='upload'){
        return(
            <div className="upload">

                <form className={'frmupl '+disply[1]} onSubmit={(e)=>handleFormUpload(e)}>
                    <label >
                        <span> فایل  معاملات</span>
                        <input type='file' onChange={(e)=>handlefiletrade(e)} ref={filetradeRef}></input>
                    </label>
                    <label>
                    <span> فایل  رجیستر</span>
                        <input type='file' onChange={(e)=>handlefileregister(e)} ref={fileregisterRef}></input>
                    </label>
                    <button className='uplbtn' type='submit'>بارگذاری</button>
                    {msg===''?null:(
                    <div className='bxerrup'>
                        <img src={require('../../../img/icon/error.png')} alt='error' id='icnerr'/>
                        <p id='msgupload'>{msg}</p>
                    </div>)}
                </form>
                <div className={"loader"+disply[0]}></div>
            </div>
        )
    }
}

export default Upload