import { useState ,useEffect} from 'react'
import axios from 'axios'

const Traders = (props) =>{

    const user = props.user

    const [alldate, setAlldate] = useState(null)
    const handleAlldate = () =>{
        axios({
            method: 'post',
            url: "http://localhost:5000/api/alldate",
            data: {username:user},
        }).then((response)=>{
            setAlldate(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })}

    useEffect(handleAlldate,[user])

    var mmax = null;
    if(alldate !== null){
        const vldate = Object.values(alldate)
        mmax = Math.max(...vldate)
    }

    const [report, setReport] = useState(false)
    const handleReport = ()=>{
        if(alldate !== null){
            axios({
                method: 'post',
                url: "http://localhost:5000/api/traderreport",
                data: {username:user, date:mmax},
            }).then((response)=>{
                setReport(response.data.result)
            }).catch((response)=>{
                console.log(response)
            })
        }
    }

    useEffect(handleReport,[alldate])

    if(props.viw==='Traders'){
        return(
            <div className="traders">
                <div className="dateset">
                    <img src={require('../../../img/icon/dataset.png')} alt='icon dataset'></img>
                    <h5>تاریخ گزارشگری اخرین روز</h5>
                    <h5 onClick={handleReport}>({mmax})</h5>
                </div>
                <div className='rprttrd'>
                <table className='tabletr'>
                    <thead>
                    <tr>
                        <th>ارزش</th>
                        <th>قیمت</th>
                        <th>حجم</th>
                        <th>نام</th>
                    </tr>
                    </thead>

                    {!report? null:(
                <tbody> 
                {report.map(item => {    
                    return (
                        <tr  key={item.id}> 
                            {Object.keys(item).map(value => {
                                    if(value!=='id')
                                        
                                        return (<td key={Math.floor(Math.random()*1000000).toString()+item.id.toString()} className={value}>{item[value]}</td>)
                            })
                            } 
                        </tr>
                            );
                    })
                }
            </tbody>

                    )
                    
                }
                    </table>

                    
                </div>
            </div>
        )
    }
}

export default Traders