import "./Header.css"
import logo from "../assets/drive_logo.png"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

export default function Header() {

    const user = useContext(UserContext)
    console.log(user)

    return (
        <div id="header" className="header-flex-container">
            <div className="header-flex-item header-left">
                <img id="logo" src={logo} alt="logo" />
                <span>
                    Workspace Graph
                </span>
            </div>
            <div className="header-flex-item header-right">
                {user && <img src={user.picture} alt="profile" />}
            </div>
        </div>
    )
}