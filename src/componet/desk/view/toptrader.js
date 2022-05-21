import { useState ,useEffect} from 'react'
import axios from 'axios'

const Toptraders = (props) =>{

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
        })
    }

    useEffect(handleAlldate,[alldate!==null])

    const [checked, setChecked] = useState(false);
    const handleChange = () => {setChecked(!checked)}


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


    const handleDatereport = (e) =>{
        setMmax(e.target.value)
    }




    const [report, setReport] = useState(false)
    const handleReport = ()=>{
        axios({
            method: 'post',
            url: "http://localhost:5000/api/traderreport",
            data: {username:user, date:mmax, side:checked},
        }).then((response)=>{
            setReport(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })
    }



    useEffect(handleReport,[mmax,checked])

    const [detailsCode, setDetailsCode] = useState('')
    const handleInfoCode = (code)=>{

        axios({
            method: 'post',
            url: "http://localhost:5000/api/detailscode",
            data: {username:user,code:code},
        }).then((response)=>{
            setDetailsCode(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })

    }

    const closeDetaileCode = () =>{
        setDetailsCode('')
    }

    const [historyCode, setHistoryCode]  = useState('')
    const handleHistoryCode = (code) =>{
        axios({
            method: 'post',
            url: "http://localhost:5000/api/historycode",
            data: {username:user,code:code},
        }).then((response)=>{
            setHistoryCode(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })
    }

    if(props.viw==='Toptraders'){
        return(
            <div className="traders">
                <div className="dateset">
                    <img src={require('../../../img/icon/dataset.png')} alt='icon dataset'></img>
                    <h5>تاریخ گزارش</h5>
                    {(mmax!==null)?(
                                        <select value={mmax} onChange={(e)=>handleDatereport(e)}>
                                        {(mmax!==null)?
                                        alldate.map(item=>
                                            <option value={item} key={item.toString()}>{item}</option>
                                            ):null}
                                    </select>):(null)}
                </div>

                <div className='side'>
                    <label>خرید
                        <input className='sidebuy' type="checkbox" checked={checked} onChange={handleChange} />
                    </label>
                    <label>فروش
                        <input className='sidesel' type="checkbox" checked={!checked} onChange={handleChange} />
                    </label>
                </div>

                <div className='rprttrd'>
                    {!report?null:(
                        report.map(row=>{
                            var ww = {width:(row.w *50).toString()+'%'};
                            return(
                                <div className='rowtrd' key={row.id}>
                                    <p style={ww}>{separate(row.volume)}</p>
                                    <h5>{row.name}</h5>
                                    <img src={require('../../../img/icon/info.png')} alt='info' className='chart' onClick={(e)=>handleInfoCode(row.code)}></img>
                                    <img src={require('../../../img/icon/chart.png')} alt='chart' className='chart' onClick={(e)=>handleHistoryCode(row.code)}></img>

                                </div>
                                )}))}
                </div>
                {detailsCode!==''?(
                    <div className='detailscode'>
                        <p onClick={closeDetaileCode}>X</p>
                        <h6>نام:  {detailsCode.Firstname}</h6>
                        <h6>نام خانوادگی:  {detailsCode.Lastname}</h6>
                        <h6>تاریخ تولد:  {detailsCode.Birthday}</h6>
                        <h6>صادره:  {detailsCode.Ispl}</h6>
                        <h6>کدملی:  {detailsCode.NationalId}</h6>
                        <h6>کدبورسی:  {detailsCode.Account}</h6>
                        </div>
                    ):null
                }
                {historyCode!==''?(
                    <div className='historycode'>
                        {historyCode.map(item =>
                            <div className='historyday'>
                                <div className='bar'>{item.cum}</div>
                                <p>{item.date}</p>
                            </div>
                        )
                        }
                    </div>
                    ):null
                }

            </div>
        )
    }
}

export default Toptraders



