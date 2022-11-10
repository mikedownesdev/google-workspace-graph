import "./SearchContainer.css"

export default function SearchContainer() {
    return (
        <div id="search-container">
            <div>
                <input id="search-input" type="text"></input>
            </div>
            <div>
                <ul>
                    <li>One</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </div>
            <div>
                expand/collapse
            </div>
        </div>
    )
}