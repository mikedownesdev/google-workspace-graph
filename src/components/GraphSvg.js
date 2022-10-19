import { useState } from "react";
import { getDag } from "../api/getDag";
// import Graph from "./Graph";
import GraphEdge from "./GraphEdge";
import GraphNode from "./GraphNode";
import * as d3 from 'd3'

export default function GraphSvg() {

    const [dimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    let dagJson = getDag();

    // Set each node to selected: false on mount
    let initalNodesData = dagJson["nodes"].map(n => ({...n, selected: false}) )

    // Initial node data
    let [nodesData, setNodesData] = useState(initalNodesData)    
    let [edgesData] = useState(dagJson["edges"])
    // let [idCount, setIdCount] = useState(2)

    let edges = edgesData.map(e => {
        let edgeData = {
            // TODO @Mike switch filter for find
            sourceNode: nodesData.find(n => n.id === e.source),
            targetNode: nodesData.find(n => n.id === e.target)
        }
        return <GraphEdge key={`${e.source}-${e.target}`} {...edgeData} />
    })

    // let edges = edgesData.map(e => {
    //     return <GraphEdge key={`${e.source}-${e.target}`} {...e} />
    // })

    /** Nodes */
    let nodeHandlers = {
        handleNodeClicked: (id) => { 
            console.log(`Node clicked. Id = ${id}`) 
            let newNodesData =  [...nodesData]  // Copy the state 
            let previouslySelectedNode = newNodesData.find(n=> {
                return n.selected
            })
            if (previouslySelectedNode) { 
                previouslySelectedNode.selected = false;
            } 
            
            let clickedNode = newNodesData.find(n => n.id === id);
            clickedNode.selected = !clickedNode.selected;
            setNodesData(newNodesData)
        },
        handleNodeDragStart: (id) => { 
            // TODO add drop shadow during drag
            console.log(`Drag is starting for Node with Id: ${id}`) 
        },
        handleNodeDrag: (id) => {
            console.log(`Dragging Node with Id: ${id}...`) 
            let newNodesData = [...nodesData]
            let draggedNode = newNodesData.find(n => n.id === id);
            draggedNode.x = d3.event.x;
            draggedNode.y = d3.event.y;
            setNodesData(newNodesData)

            
            // TODO I'm not sure we really need to use the setCoordinates
            // method here. We can simply update the state when we the drag
            // has ended
            // setCoordinates({
            //     xPos: d3.event.x, 
            //     yPos: d3.event.y
            // }) 
        },
        handleNodeDragEnd: (id) => { 
            console.log(`Drag end for Node with Id: ${id}`) 
            console.log(`updating nodes state`) 
            let newNodesData = [...nodesData]
            let draggedNode = newNodesData.find(n => n.id === id);
            draggedNode.x = d3.event.sourceEvent.x
            draggedNode.y = d3.event.sourceEvent.y
            setNodesData(newNodesData)
        }
    }
    let nodes = nodesData.map(n => {
        let props = {
            data: n,
            handlers: nodeHandlers
        }
        return <GraphNode key={n.id} {...props} />
    })
    
    let style = {}

    

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
        let newNodesData = [...nodesData]
        let newNode = {
            "id": new Date().valueOf(),
            "title": "Created",
            "x": e.clientX,
            "y": e.clientY, //Math.random() * ((dimensions.height * .9) - 50) + 50
        }
        newNodesData.push(newNode)
        setNodesData(newNodesData)
    }

    // function handleMouseDown(e) {
    //     if (e.shiftKey) { console.log(e); return }
    //     console.log("Use shift")
    // }

    return (
        <svg 
            width={dimensions.width} 
            height={dimensions.height} 
            style={helperStyleObject} 
            onDoubleClick={addNode} 
            // onMouseDown={handleMouseDown}
        >
            <defs>
                <marker id="end-arrow" viewBox="0 -5 10 10" refX="32" markerWidth="3.5" markerHeight="3.5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
                <marker id="mark-end-arrow" viewBox="0 -5 10 10" refX="7" markerWidth="3.5" markerHeight="3.5" orient="auto">
                    <path d="M0,-5L10,0L0,5"></path>
                </marker>
            </defs>
            <g className="graph">
                <path className="link dragline hidden" d="M0,0L0,0" style={style}></path>
                <g id="edges-g">
                    {edges}
                </g>
                <g id="nodes-g">
                    {nodes}
                </g>
            </g>
            {/* <Graph nodesData={nodesData} edgesData={edgesData} /> */}
        </svg>
    )
}
