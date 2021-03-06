import { useState ,useEffect} from 'react'
import axios from 'axios'

const Toptraders = (props) =>{

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





    const [dataIstgah, setDataIstgah] = useState(null)
    const handleDataIstgah = ()=> {
        axios({
            method: 'post',
            url: "http://156.253.5.210:5000/api/traderreport",
            data: {username:user, form:frm, to:tom, side:checked},
        }).then((response)=>{
            setDataIstgah(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })
    }



    useEffect(handleDataIstgah,[checked,tom,frm,user])

    const [detailsCode, setDetailsCode] = useState('')
    const handleInfoCode = (code)=>{

        axios({
            method: 'post',
            url: "http://156.253.5.210:5000/api/detailscode",
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
            url: "http://156.253.5.210:5000/api/historycode",
            data: {username:user,code:code},
        }).then((response)=>{
            setHistoryCode(response.data.result)
        }).catch((response)=>{
            console.log(response)
        })
    }

    const closeHistoryCode = ()=>{
        setHistoryCode('')
    }



    if(props.viw==='Toptraders'){
        return(
            <div className="traders">
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



                <div className='rprttrd'>
                    <div className='side'>
                        <label className={stcheck[0]} onClick={handleChange}>????????
                        </label>
                        <label className={stcheck[1]} onClick={handleChange}>????????
                        </label>
                    </div>
                    <div className='htt'>
                        <p className='http'>????????</p>
                        <p className='httv'>??????</p>
                        <p className='httn'>??????</p>
                        <p className='httd'>??????????????</p>
                        <p className='htta'>??????????</p>
                    </div>
                    {!dataIstgah?null:(
                        dataIstgah.map(row=>{
                            var ww = {width:(row.w *50).toString()+'%'};
                            return(
                                <div className='rowtrd' key={row.id}>
                                    <h6 className='avgprc'>{separate(row.price)} ????????</h6>
                                    <p style={ww}>{separate(row.volume)}</p>
                                    <h5>{row.name}</h5>
                                    <img src={require('../../../img/icon/info.png')} alt='info' className='chart' onClick={(e)=>handleInfoCode(row.code)}></img>
                                    <img src={require('../../../img/icon/chart.png')} alt='chart' className='chart' onClick={(e)=>handleHistoryCode(row.code)}></img>
                                </div>
                                )}))}
                </div>
                {detailsCode!==''?(
                    <div className='detailscode'>
                        <h6>{detailsCode.Firstname} {detailsCode.Lastname} ?? ?????????? {detailsCode.Birthday}</h6>
                        <h6>???? ???? ??????  {detailsCode.NationalId} ?? ?????????? ???? {detailsCode.Ispl}</h6>
                        <h6>?? ???? ??????????  {detailsCode.Account}</h6>
                        <button onClick={closeDetaileCode}>??????????</button>
                        </div>
                    ):null
                }

                {historyCode!==''?(
                    <div className='historycode'>
                    
                    <div className='posbar'>
                        {historyCode===''?null:(
                        historyCode.map(item=>{
                            if (item.ww>0){
                                var stposbar = {backgroundColor:'#a4d4aa',height:(item.ww*100).toString()+'px'}
                                var contentposbar = (separate(Math.floor(item.cum/1000))).toString()+' K'
                                }else{
                                var stposbar = {backgroundColor:'#a4d4aa',height:'0px'}
                                var contentposbar = ''
                                }
                                return(
                                        <div style={stposbar} className='subposbar'>{contentposbar}</div>
                                    )}))}
                        </div>
                        <div className='negbar'>
                        {historyCode===''?null:(
                        historyCode.map(item=>{
                            if (item.ww<0){
                                var stnegbar = {backgroundColor:'#d4a4a4',height:Math.abs(item.ww*100).toString()+'px'}
                                var contentnegbar = (separate(Math.floor(item.cum/1000))).toString()+' K'
                                }else{
                                var stnegbar = {backgroundColor:'#d4a4a4',height:'0px'}
                                var contentnegbar = ''
                                }
                                return(
                                        <div style={stnegbar} className='subnegbar'>{contentnegbar}</div>
                                    )}))}
                         </div>
                         <div className='bardate'>
                        {historyCode===''?null:(
                        historyCode.map(item=>{
                                return(
                                        <p className='bardatesub'>{item.date}</p>
                                    )})
                         )}
                         </div>
                         <button onClick={closeHistoryCode}>??????????</button>
                </div>):null}

            </div>
        )
    }
}

export default Toptraders



