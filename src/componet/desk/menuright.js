
const Menu = (props) =>{
    const menuright = props.menuright

    if(menuright){
        return(
            <div className="menur">
                <button className="btm">بارگذاری فایل</button>
                <button>معامله گران روز جاری</button>
            </div>
        )
    }

}

export default Menu