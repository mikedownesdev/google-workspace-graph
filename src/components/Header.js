import "./Header.css"
import logo from "../assets/drive_logo.png"

export default function Header() {

    return (
        <div id="header" className="header-flex-container">
            <div className="header-flex-item header-left">
                <img id="logo" src={logo} alt="logo" />
                <span>
                    Workspace Graph
                </span>
            </div>
            <div className="header-flex-item header-right">
                <img src={logo} alt="profile" />
            </div>
        </div>
    )
}