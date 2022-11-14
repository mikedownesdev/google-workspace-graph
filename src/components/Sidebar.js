import { NavLink } from "react-router-dom"
import "./Sidebar.css"

export default function Sidebar() {
    return (
        <div id="sidebar">
            <ul>
                <li>Explorer</li>
            </ul>
            <hr />
            <span>Private Graphs</span>
            <ul>                
                <li>
                    <NavLink 
                        to={`canvases/1`}
                        className={({ isActive, isPending }) =>
                            isActive ? "active" : isPending ? "pending" : ""
                        }
                    >
                        🌐 Graph 1
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`canvases/2`}>
                        🌐 Graph 2
                    </NavLink>
                </li>
            </ul>
            <hr />
            <span>Shared Graphs</span>
            <ul>                
                <li>
                    <NavLink to={`canvases/3`}>
                        🌐 Graph 3
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`canvases/4`}>
                        🌐 Graph 4
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}