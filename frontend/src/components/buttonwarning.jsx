import {Link} from "react-router-dom"
export function Bottomwarning({label,buttonText,to}){
    return(
        <div className="text-2xl flex pt-2 text-white">
            <div>
                {label}
            </div>
            <Link className = "underline pointer cursor-pointer text-blue-500" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}