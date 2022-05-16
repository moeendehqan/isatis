import './login.css'

const Login = () => {


    return(
        <div className='login'>
            <div className='ent'>
                <div>
                    <img src={require('../../img/icon/login.png')} alt='login icon' className='icn'></img>
                    <h2>ورود</h2>
                </div>
                <form>
                    <label>
                        <span>نام کاربری</span>
                        <input></input>
                    </label>

                </form>

            </div>
            <div className='dtl'>
                <h2>رنـــد</h2>
                <h4>سامانه گزارش  دهی امور سهام</h4>
            </div>


        </div>
        )
}

export default Login