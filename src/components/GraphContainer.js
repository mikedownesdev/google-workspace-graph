import GraphSvg from './GraphSvg.js'
import SearchContainer from './SearchContainer.js'
import './GraphContainer.css'

export default function GraphContainer() {    
    return (
        <div id="graph-container">
            <SearchContainer />
            <GraphSvg />
        </div>
    )
}