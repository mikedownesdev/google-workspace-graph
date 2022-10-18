// import { useState } from "react"
import GraphEdge from "./GraphEdge";
import GraphNode from "./GraphNode";


export default function Graph({nodesData, edgesData}) {

    let edges = edgesData.map(e => {
        let edgeData = {
            sourceNode: nodesData.filter(n => n.id === e.source)[0],
            targetNode: nodesData.filter(n => n.id === e.target)[0]
        }
        return <GraphEdge key={`${e.source}-${e.target}`} {...edgeData} />
    })

    // let edges = edgesData.map(e => {
    //     return <GraphEdge key={`${e.source}-${e.target}`} {...e} />
    // })
    let nodes = nodesData.map(n => <GraphNode key={n.id} {...n} />)
    
    let style = {}
    
    return (
        <g className="graph">
            <path className="link dragline hidden" d="M0,0L0,0" style={style}></path>
            <g id="nodes-g">
                {nodes}
            </g>
            <g id="edges-g">
                {edges}
                {/* <GraphEdge props={{source: "", edge: ""}} /> */}
            </g>
        </g>
        
    )
}

