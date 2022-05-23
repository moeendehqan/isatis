import { useState ,useEffect} from "react"
import axios from "axios"


const Istgah = (props) =>{

    const user = props.user
    const [alldate, setAlldate] = useState(null)
    const [frm, setfrm] = useState(null)
    const [tom, settom] = useState(null)
    const handleAlldate = () =>{
            axios({
            method: 'post',
            url: "http://localhost:5000/api/alldate",
            data: {username:user},
        }).then((response)=>{
            setAlldate(response.data.result)
            if(alldate!==null && frm===null){
                const vldate = Object.values(alldate)
                setfrm(Math.max(...vldate))
                settom(Math.max(...vldate))
            }
        }).catch((response)=>{
            console.log(response)
        })}
    useEffect(handleAlldate,[alldate!==null])

    const handledtreportfrm = (e) =>{
        setfrm(e.target.value)
    }
    const handledtreporttom = (e) =>{
        settom(e.target.value)
    }

    const [side,setsite] = useState(true)
    const handlecheck = ()=>{setsite(!side)}

    const [dataIstgah, setDataIstgah] = useState(null)
    const handleDataIstgah = ()=> {
        axios({
            method: 'post',
            url: "http://localhost:5000/api/istgah",
            data: {username:user, form:frm, to:tom, side:side},
        }).then((response)=>{
            setDataIstgah(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })
    }

    useEffect(handleDataIstgah,[side,tom,frm,user])
    console.log(dataIstgah)


    if(props.viw==='istgah'){
        return(
            <div className="istgah">
                <div className="dtistgah">
                    <span>تاریخ گزارش از</span>
                    {frm!==null?(<select value={frm}  onChange={(e)=>handledtreportfrm(e)}>
                        {frm===null?null:(
                            alldate.map(item =>{
                                return(<option value={item} key={item}>{item}</option>)
                            }))}
                    </select>):null}
                    <span>تا</span>
                    {tom!==null?(<select value={tom}  onChange={(e)=>handledtreporttom(e)}>
                        {tom===null?null:(
                            alldate.map(item =>{
                                return(<option value={item} key={item}>{item}</option>)
                            }))}
                    </select>):null}
                </div>
                <div className="sidebox">
                    <label>خرید
                        <input type='checkbox' checked={side} onChange={handlecheck}/>
                    </label>
                    <label>فروش
                        <input type='checkbox' checked={!side} onChange={handlecheck}/>
                    </label>
                </div>
                <div className="chartistgah">
                    {dataIstgah===null?null:(
                        dataIstgah.map(item=>{
                            const stt = {width:((item.ww*80).toString()+'%')}

                            return(
                                <div className="oneistgah" key={item.Istgah}>
                                    <p>{item.Volume}</p>
                                    <p className="istgahw" style={stt}></p>
                                    <p className="istgahcode">{item.Istgah}</p>
                                </div>

                            )
                        })
                    )

                    }

                </div>


            </div>
        )
    }
}

export default Istgah