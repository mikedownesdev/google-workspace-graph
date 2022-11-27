import { NavLink } from "react-router-dom"
import { useDrive } from "../hooks/useDrive"
import "./Sidebar.css"

export default function Sidebar() {

    const driveObject = useDrive()
    const files = driveObject?.data.files.filter(f => f.mimeType === "application/json")

    console.log(driveObject)

    return (
        <div id="sidebar">
            <ul>
                <li>
                    <NavLink to={"/explorer"}>Explorer</NavLink>
                </li>
            </ul>
            <hr />
            <span>Private Graphs</span>
            <ul>
                {
                    files && files.map((file) => {
                        return (
                            <li key={file.id}>
                                <NavLink
                                    to={`canvases/${file.id}`}
                                    className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                                >
                                    🌐 {file.name}
                                </NavLink>
                            </li>
                        )
                    })
                }
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