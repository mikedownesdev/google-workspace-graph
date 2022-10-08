import { useEffect, useState } from "react";
import { getDag } from "../api/getDag";
import Graph from "./Graph";

export default function GraphSvg() {

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    let dagJson = getDag();

    // Initial node data
    let [nodesData, setNodesData] = useState(dagJson["nodes"])    
    // let [edges, setEdges] = useState(dagJson["edges"])
    // let [idCount, setIdCount] = useState(2)

    

    /**
     * useEffect will run upon mount, and 
     */
    // useEffect(() => {
    //     function handleResize() { setDimensions({ width: window.innerWidth, height: window.innerHeight }) } // Define your event handler
    //     window.addEventListener('resize', handleResize) // Add this handler as to an event
    //     return () => window.removeEventListener('resize', handleResize) // Remove the event listener at tear down
    // })


    // let docEl = document.documentElement
    // let bodyEl = document.getElementsByTagName('body')[0];

    // const [width, setWidth] = useState(window.innerWidth || docEl.clientWidth || bodyEl.clientWidth)
    // const [height, setHeight] = useState(window.innerHeight|| docEl.clientHeight|| bodyEl.clientHeight)

    let helperStyleObject = {
        border: "4px black solid",
        margin: "4px",
    }

    function addNode(e) {        
        let newNodeData = {
            "id": new Date().valueOf(),
            "title": "Created",
            "x": e.clientX,
            "y": e.clientY, //Math.random() * ((dimensions.height * .9) - 50) + 50
        }

        setNodesData([...nodesData, newNodeData])
    }


    return (
        <svg width={dimensions.width} height={dimensions.height} style={helperStyleObject} onDoubleClick={addNode}>
            <defs>
                <marker id="end-arrow" viewBox="0 -5 10 10" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
                <marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
            </defs>
            <Graph nodesData={nodesData}/>
        </svg>
    )
}
