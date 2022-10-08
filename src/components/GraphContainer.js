import uploadIcon from '../icons/upload-icon.png'
import downloadIcon from '../icons/download-icon.png'
import trashIcon from '../icons/trash-icon.png'
import GraphSvg from './GraphSvg.js'

export default function GraphContainer() {    
    return (
        <div id="graph">
            <div id="toolbox">
                <input type="file" id="hidden-file-upload" />
                <input id="upload-input" type="image" title="upload graph" src={uploadIcon} alt="upload graph" /> 
                <input type="image" id="download-input" title="download graph" src={downloadIcon} alt="download graph" /> 
                <input type="image" id="delete-graph" title="delete graph" src={trashIcon} alt="delete graph" />
            </div>
            <GraphSvg />
        </div>
    )
}