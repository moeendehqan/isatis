import { useState ,useEffect} from 'react'
import axios from 'axios'

const Toptraders = (props) =>{

    const user = props.user
    const [alldate, setAlldate] = useState(null)
    const handleAlldate = async () =>{
        await axios({
            method: 'post',
            url: "http://localhost:5000/api/alldate",
            data: {username:user},
        }).then((response)=>{
            setAlldate(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })}

    useEffect(handleAlldate,user)

    console.log(alldate)
    const [checked, setChecked] = useState(false);
    const handleChange = () => {setChecked(!checked)
    
    
    }
    function separate(Number) 
    {
    Number+= '';
    Number= Number.replace(',', '');
    var x = Number.split('.');
    var y = x[0];
    var z= x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(y))
    y= y.replace(rgx, '$1' + ',' + '$2');
    return y+ z;
    }

    const [datereport, setDatereport] = useState(alldate[0])
    const handleDatereport = (e) =>{
        setDatereport(e.target.value)
    }
    console.log(datereport)


    const [report, setReport] = useState(false)
    const handleReport = ()=>{
        if(datereport !== null){
            axios({
                method: 'post',
                url: "http://localhost:5000/api/traderreport",
                data: {username:user, date:datereport, side:checked},
            }).then((response)=>{
                if(response.data.res){
                    setReport(response.data.result)
                }
            }).catch((response)=>{
                console.log(response)
            })
        }
    }



    useEffect(handleReport,[datereport,checked,alldate])


    if(props.viw==='Toptraders'){
        return(
            <div className="traders">
                <div className="dateset">
                    <img src={require('../../../img/icon/dataset.png')} alt='icon dataset'></img>
                    <h5>تاریخ گزارشگری اخرین روز</h5>
                    <select value={datereport} onChange={(e)=>handleDatereport(e)}>
                        {(datereport!==null)?
                        alldate.map(item=>
                            <option value={item} key={item.toString()}>{item}</option>
                            ):null}
                    </select>
                </div>

                <div className='side'>
                    <label>
                        خرید
                        <input className='sidebuy' type="checkbox" checked={checked} onChange={handleChange} />
                    </label>

                    <label>
                        فروش
                        <input className='sidesel' type="checkbox" checked={!checked} onChange={handleChange} />
                    </label>
                </div>


                <div className='rprttrd'>
                    {!report?null:(
                        report.map(row=>{
                            var ww = {width:(row.w *50).toString()+'%'};
                            return(
                                <div className='rowtrd' key={row.id}>
                                    <p style={ww}>{row.volume}</p>
                                    <h5>{row.name}</h5>
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

export default Toptraders



