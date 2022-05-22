
const Menu = (props) =>{
    const menuright = props.menuright
    

    if(menuright){
        return(
            <div className="menur">
                <button className="btm" onClick={(e)=>props.handleViw('upload')}>بارگذاری فایل</button>
                <button className="btm" onClick={(e)=>props.handleViw('Toptraders')}>معامله گران برتر روز</button>
                <button className="btm" onClick={(e)=>props.handleViw('newtraders')}>معامله گران جدیدالورود</button>
                <button className="btm" onClick={(e)=>props.handleViw('istgah')}>ایستگاه های معاملاتی</button>

            </div>

            
        )
    }
}

export default Menu