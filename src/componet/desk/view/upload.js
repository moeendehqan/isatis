
const Upload = (props) =>{
    if(props.viw==='upload'){
        return(
            <div className="upload">
                <img src={require('../../../img/icon/upload.png')} alt='upload icon'></img>
                <form>
                    <label>
                        <span> فایل  معاملات</span>
                        <input type='file'></input>
                    </label>
                    <label>
                    <span> فایل  رجیستر</span>
                        <input type='file'></input>
                    </label>
                    <button className='uplbtn'>بارگذاری</button>
                    
                </form>

            </div>
        )
    }
}

export default Upload