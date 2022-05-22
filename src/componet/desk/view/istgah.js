import { useState ,useEffect} from "react"
import axios from "axios"
const Istgah = (props) =>{

    const user = props.user
    const [alldate, setAlldate] = useState(null)
    const [mmax, setMmax] = useState(null)
    const handleAlldate = () =>{
            axios({
            method: 'post',
            url: "http://localhost:5000/api/alldate",
            data: {username:user},
        }).then((response)=>{
            setAlldate(response.data.result)
            if(alldate!==null && mmax===null){
                const vldate = Object.values(alldate)
                setMmax(Math.max(...vldate))
            }
        }).catch((response)=>{
            console.log(response)
        })}
    useEffect(handleAlldate,[alldate!==null])
    console.log(alldate)

    const handledtreport = (e) =>{
        setMmax(e.target.result)
    }



    if(props.viw==='istgah'){
        return(
            <div className="istgah">
                <div className="dtistgah">
                    <span>تاریخ گزارش</span>
                    {mmax!==null?(<select value={mmax}  onChange={(e)=>handledtreport(e)}>
                        {mmax===null?null:(
                            alldate.map(item =>{
                                return(<option value={item}>{item}</option>)

                            })

                        )

                        }
                    </select>):null}

                </div>

            </div>
        )
    }
}

export default Istgah