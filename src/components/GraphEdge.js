export default function GraphEdge({sourceNode, targetNode}) {

    // let sourceD3 = d3.select(`#n-${source}`);
    // let targetD3 = d3.select(`#n-${target}`

    // let sourceNodeX = 1205,
    // soureceNodeY = 813,
    // targetNodeX = 1196,
    // targetNodeY = 368

    // let sourceNodeX = sourceNode.x;
    // let sourceNodeY = sourceNode.y;
    // let targetNodeX = targetNode.x;
    // let targetNodeY = targetNode.y;

    let pathString = 
    `M${sourceNode.x},${sourceNode.y}L${targetNode.x},${targetNode.y}`;

    // let [pathString, setPathString] = useState(pathStringInit)

    let style = {
        markerEnd: 'url("#end-arrow")'
    }


    return (
        <path className="link" 
            d={pathString}
            style={style}>
        </path>
    )
}