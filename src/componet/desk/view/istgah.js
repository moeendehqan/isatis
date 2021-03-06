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
            url: "http://156.253.5.210:5000/api/alldate",
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

    const [checked, setChecked] = useState(true);
    const [stcheck, setstcheck] =  useState(['sidebuyact','sidenotact'])
    const handleChange = () => {
    
        if(checked!==true){
            setstcheck(['sidebuyact','sidenotact'])
        }else{
            setstcheck(['sidenotact','sideselact'])
        }
        setChecked(!checked)
    }
    const [dataIstgah, setDataIstgah] = useState(null)
    const handleDataIstgah = ()=> {
        axios({
            method: 'post',
            url: "http://156.253.5.210:5000/api/istgah",
            data: {username:user, form:frm, to:tom, side:checked},
        }).then((response)=>{
            setDataIstgah(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })
    }

    const slicedate = (str) =>{
        let s =str.toString()
        let year = s.substr(0,4)
        let mont = s.substr(4,2)
        let day = s.substr(6,2)
        return year.concat('/',mont,'/',day)
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


    useEffect(handleDataIstgah,[checked,tom,frm,user])



    if(props.viw==='istgah'){
        return(
            <div className="istgah">
                <div className="dtistgah">
                    <span>???????? ?????????? ??????????</span>
                    {frm!==null?(<select value={(frm)}  onChange={(e)=>handledtreportfrm(e)}>
                        {frm===null?null:(
                            alldate.map(item =>{
                                return(<option value={item} key={item}>{(item)}</option>)
                            }))}
                    </select>):null}
                    <span>??</span>
                    {tom!==null?(<select value={(tom)}  onChange={(e)=>handledtreporttom(e)}>
                        {tom===null?null:(
                            alldate.map(item =>{
                                return(<option value={item} key={item}>{(item)}</option>)
                            }))}
                    </select>):null}
                </div>
     
                <div className="chartistgah">
                <div className='side'>
                        <label className={stcheck[0]} onClick={handleChange}>????????
                        </label>
                        <label className={stcheck[1]} onClick={handleChange}>????????
                        </label>
                    </div>
                    <div className='hci'>
                            <p>??????????</p>
                            <p className="hciv">?????? ??????????????</p>
                            <p className="hcii">??????????????</p>
                            <p>????</p>
                    </div>
                    {dataIstgah===null?null:(
                        dataIstgah.map(item=>{
                            const stt = {width:((item.ww*60).toString()+'%')}

                            return(
                                <div className="oneistgah" key={item.Istgah}>
                                    <p className="istgahcount">{separate(item.count)}</p>
                                    <p className="istgahvolume">{separate(Math.floor(item.Volume/1000)).toString()+' K'}</p>
                                    <p className="istgahw" style={stt}></p>
                                    <p className="istgahname"><span>{item.name}</span></p>
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