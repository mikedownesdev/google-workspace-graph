export default function GraphEdge({sourceNode, targetNode}) {

    // let sourceD3 = d3.select(`#n-${source}`);
    // let targetD3 = d3.select(`#n-${target}`

    let pathString = 
    `M${sourceNode.x},${sourceNode.y}L${targetNode.x},${targetNode.y}`;

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