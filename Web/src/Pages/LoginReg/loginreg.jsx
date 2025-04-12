import { useState } from "react";
import "./loginreg.css"
const Loginreg = () => {
    
    const [action,setAction] = useState("Cadastre-se")
    
    return (
        <div className="backgroundtotal">

        <div className="container_test"> 

        <div className="header">

        <div className="text">{action}</div>
        <div className="underline"></div>
        </div>
        <div className="inputs">
        {action==="Login"?<div></div>: <div className="input_test"> <input type="text" placeholder="Name" />
        </div>}
        
        <div className="input_test">
            <input type="email"  placeholder="Email" />
        </div>
        <div className="input_test">
            <input type="password" placeholder="Password" />
        </div>
        </div>
        {action==="Cadastre-se"? <div></div>:<div className="forgot-password">Esqueceu a senha ? <span>Clique aqui</span></div>}
        
        <div className="submit-container">
            <div className= {action==="Login"?"submit gray": "submit"} onClick={() => {setAction("Login")}}>Login</div>
            <div className={action==="Cadastre-se" ? "submit gray": "submit"} onClick={()=> {setAction("Cadastre-se")}}>Cadastre-se</div>

        </div>
        </div>
        </div>
        

    )

}

export default Loginreg