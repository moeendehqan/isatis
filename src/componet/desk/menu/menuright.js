
const Menu = (props) =>{
    const menuright = props.menuright
    

    if(menuright){
        return(
            <div className="menur">
                <button className="btm">بارگذاری فایل</button>
                <button className="btm">معامله گران روز جاری</button>
            </div>
        )
    }

}

export default Menu