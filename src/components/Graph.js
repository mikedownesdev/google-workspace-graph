// import { useState } from "react"
import GraphNode from "./GraphNode";


export default function Graph({nodesData}) {

    // let edges = edgesData.map(eData => <GraphEdge key={new Date().valueOf()} {...eData})
    let nodes = nodesData.map(nData => <GraphNode key={nData.id} {...nData}/> )

    /*
    let style = {
        marker-end: "marker-end: url(&quot;#mark-end-arrow&quot;);";
    }*/

    let style = {}

    
    return (
        <g className="graph">
            <path className="link dragline hidden" d="M0,0L0,0" style={style}></path>
            <g id="edges-g">

            </g>
            <g id="nodes-g">
                {nodes}
            </g>
        </g>
        
    )

    

}

