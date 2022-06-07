import { useState } from 'react'
const Menu = (props) =>{
    const v = props.viw



        return(
            <div className="menur">
                <div id='upbtm' className='btm' onClick={(e)=>props.handleViw('upload')}>
                    <p> <img src={require('../../../img/icon/mupload.png')}></img> </p>
                </div>
                <div id='toptr' className='btm' onClick={(e)=>props.handleViw('Toptraders')}>
                    <p> <img src={require('../../../img/icon/mtrader.png')}></img> </p>
                </div>
                <div id='newtr' className='btm' onClick={(e)=>props.handleViw('newtraders')}>
                    <p> <img src={require('../../../img/icon/mnewbie.png')}></img> </p>
                </div>
                <div id='istgh' className='btm' onClick={(e)=>props.handleViw('istgah')}>
                    <p> <img src={require('../../../img/icon/mstation.png')}></img> </p>
                </div>

            </div>

            
        )

}

export default Menu