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
        useEffect(handlenewtraders,[user])
    
    if(props.viw==='newtraders'){
        return(
            <div className="newtraders">
                <div className="ntvolume">
                    <h4>حجم خرید جدیدالورودها</h4>
                    <div className="sumnt">
                        {dataNewTraders===''?null:(
                            dataNewTraders.map(item=>{
                                const stal = {height:(item.wwav*100).toString()+'px'}
                                const stnw = {height:(item.wwnv*100).toString()+'px'}
                                const key = Math.floor(Math.random()*1000).toString()
                                return(
                                    <div>
                                        <div key={key} className='barnt'>
                                            <div style={stal} className='barall'></div>
                                            <div style={stnw} className='barnew'></div>
                                        </div>
                                        <p className="ntav">{(Math.floor(item.allvol/1000)).toString()+' k'}</p>
                                        <p className="ntnv">{(Math.floor(item.newvol/1000)).toString()+' k'}</p>
                                        <p className="ntpv">{(Math.floor((item.newvol/item.allvol)*100)).toString()+' %'}</p>
                                        <p className="ntdate">{item.Date}</p>
                                    </div>
                                )
                        }))}
                    </div>
                    <div className="helper">
                        <h6 className="hlpall">حجم کل</h6>
                        <h6 className="hlpnew">جدیدالورودها</h6>
                        <h6 className="hlpprc">نسبت کل به جدیدالورودها</h6>
                    </div>
                </div>



                <div className="ntvolume">
                    <h4>تعداد خرید جدیدالورودها</h4>
                    <div className="sumnt">
                        {dataNewTraders===''?null:(
                            dataNewTraders.map(item=>{
                                const stal = {height:(item.wwan*100).toString()+'px'}
                                const stnw = {height:(item.wwnn*100).toString()+'px'}
                                const key = Math.floor(Math.random()*1000).toString()
                                return(
                                    <div>
                                        <div key={key} className='barnt'>
                                            <div style={stal} className='barall'></div>
                                            <div style={stnw} className='barnew'></div>
                                        </div>
                                        <p className="ntav">{item.allnum}</p>
                                        <p className="ntnv">{item.newnum}</p>
                                        <p className="ntpv">{(Math.floor((item.newnum/item.allnum)*100)).toString()+' %'}</p>
                                        <p className="ntdate">{item.Date}</p>
                                    </div>
                                )
                        }))}
                    </div>
                    <div className="helper">
                        <h6 className="hlpall">تعداد کل</h6>
                        <h6 className="hlpnew">جدیدالورودها</h6>
                        <h6 className="hlpprc">نسبت کل به جدیدالورودها</h6>
                    </div>
                </div>
            </div>
        )
    }

}

export default Newtraders