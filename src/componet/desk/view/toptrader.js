import { useState ,useEffect} from 'react'
import axios from 'axios'

const Toptraders = (props) =>{

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

    const [report, setReport] = useState(false)
    const handleReport = ()=>{
        if(alldate !== null){
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
    }

    useEffect(handleReport,[alldate,checked])


    if(props.viw==='Toptraders'){
        return(
            <div className="traders">
                <div className="dateset">
                    <img src={require('../../../img/icon/dataset.png')} alt='icon dataset'></img>
                    <h5>تاریخ گزارشگری اخرین روز</h5>
                    <h5 onClick={handleReport}>({mmax})</h5>
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



