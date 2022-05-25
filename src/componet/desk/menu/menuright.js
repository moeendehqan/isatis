
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'


const Menu = (props) =>{
    

        return(
            <div className="menur">
                <div id='upbtm' className="btm" onClick={(e)=>props.handleViw('upload')}>
                    <p> <FontAwesomeIcon icon="fa-solid fa-upload" /> </p>
                </div>
                <div id='toptr' className="btm" onClick={(e)=>props.handleViw('Toptraders')}>
                    <p> <FontAwesomeIcon icon="fa-solid fa-user-tie" /> </p>
                </div>
                <div id='newtr' className="btm" onClick={(e)=>props.handleViw('newtraders')}>
                    <p> <FontAwesomeIcon icon="fa-solid fa-user" /> </p>
                </div>
                <div id='istgh' className="btm" onClick={(e)=>props.handleViw('istgah')}>
                    <p> <FontAwesomeIcon icon="fa-solid fa-building" /> </p>
                </div>

            </div>

            
        )

}

export default Menu