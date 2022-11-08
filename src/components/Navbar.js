import "./Navbar.css"
import logo from "../assets/drive_logo.png"

export default function Navbar() {

    return (
        <nav>
            <div>
                <img src={logo} alt="logo" />
                <span>
                    Graph
                </span>
            </div>
            <div>
                <img src={logo} alt="profile" />
            </div>
        </nav>
    )
}