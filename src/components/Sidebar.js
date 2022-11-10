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
                    🌐 Graph 1
                </li>
                <li>🌐 Graph 2</li>
            </ul>
            <hr />
            <span>Shared Graphs</span>
            <ul>                
                <li>🌐 Graph 3</li>
                <li>🌐 Graph 4</li>
            </ul>
        </div>
    )
}