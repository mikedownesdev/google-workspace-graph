import { useState } from "react";
import { getDag } from "../api/getDag";
import GraphEdge from "./GraphEdge";
import GraphNode from "./GraphNode";
import "./GraphSvg.css"

export default function GraphSvg() {
    /** -- Get Data --------------------------------------------------------- */
    const dagJson = getDag();

    /** -- State ------------------------------------------------------------ */
    const [dimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    // Set each node to selected: false on mount
    const initalNodesData = dagJson["nodes"].map(n => ({...n, selected: false}))
    const initialEdgesData = dagJson["edges"];

    const [nodesData, setNodesData] = useState(initalNodesData)    
    const [edgesData, setEdgesData] = useState(initialEdgesData)
    const [creatingEdge, setCreatingEdge] = useState({ is: false, from: null })
    console.log(`creatingEdge: ${creatingEdge.is} from ${creatingEdge.from}`)

    /** -- Edges ------------------------------------------------------------ */
    const edges = edgesData.map(e => {
        const key = `${e.source}-${e.target}`
        const sourceNode = nodesData.find(n => n.id === e.source) 
        const targetNode = nodesData.find(n => n.id === e.target)

        return (
            <GraphEdge 
                key={key}
                sourceNode={sourceNode}  
                targetNode={targetNode}
            />)
    })

    

    /** -- Nodes ------------------------------------------------------------ */
    //     handleNodeClicked: (id) => { 
    //         console.log(`Node clicked. Id = ${id}`) 
    //         const newNodesData = [...nodesData]  // Copy the state 
    //         const previouslySelectedNode = newNodesData.find(n=> {
    //             return n.selected && n.id !== id
    //         })
    //         if (previouslySelectedNode) { 
    //             previouslySelectedNode.selected = false;
    //         } 
            
    //         const clickedNode = newNodesData.find(n => n.id === id);
    //         clickedNode.selected = !clickedNode.selected;
    //         setNodesData(newNodesData)
    //     },

        // handleNodeMouseLeave: (info) => {
        //     console.log('handleNodeMouseLeave')
        //     setCreatingEdge(info)
        // },

        // handleNodeMouseUp: (id) => {
        //     // @TODO - Can create duplicate edges?!
        //     console.log(`handleNodeMouseUp on ${id}`)
        //     if (creatingEdge.is && creatingEdge.from !== id) {
        //         const newEdgesData = [...edgesData]
        //         const newEdge = {
        //             "source": creatingEdge.from,
        //             "target": id
        //         }
        //         newEdgesData.push(newEdge)
        //         setEdgesData(newEdgesData)
        //     }
        // },

        // handleNodeDragStart: (id) => { 
        //     // TODO add drop shadow during drag
        //     console.log(`Drag is starting for Node with Id: ${id}`) 
        // },

        // handleNodeDrag: (id) => {
        //     console.log(`Dragging Node with Id: ${id}...`) 
        //     let newNodesData = [...nodesData]
        //     let draggedNode = newNodesData.find(n => n.id === id);
        //     draggedNode.x = d3.event.x;
        //     draggedNode.y = d3.event.y;
        //     console.log(newNodesData.find(n => n.id === id)); // 
        //     setNodesData(newNodesData)

            
        //     // TODO I'm not sure we really need to use the setCoordinates
        //     // method here. We can simply update the state when we the drag
        //     // has ended
        //     // setCoordinates({
        //     //     xPos: d3.event.x, 
        //     //     yPos: d3.event.y
        //     // }) 
        // },

        // handleNodeDragEnd: (id) => { 
        //     console.log(`Drag end for Node with Id: ${id}`) 
        //     console.log(`updating nodes state`) 
        //     let newNodesData = [...nodesData]
        //     let draggedNode = newNodesData.find(n => n.id === id);
        //     draggedNode.x = d3.event.sourceEvent.x
        //     draggedNode.y = d3.event.sourceEvent.y
        //     setNodesData(newNodesData)
        // },


    const handleNodeMouseUp = id => {
        // @TODO - Can create duplicate edges?!
        console.log(`handleNodeMouseUp on ${id}`)
        if (creatingEdge.is && creatingEdge.from !== id) {
            const edgeExists = edgesData.some((edge) => {
                return (edge.source === creatingEdge.from 
                    && edge.target === id)
            })
            if (edgeExists) { return }
            const newEdgesData = [...edgesData]
            const newEdge = {
                "source": creatingEdge.from,
                "target": id
            }
            newEdgesData.push(newEdge)
            setEdgesData(newEdgesData)
        }
    }

    const handleNodeClicked = id => {
        console.log(`Node clicked. Id = ${id}`) 
        const newNodesData = [...nodesData]  // Copy the state 
        const previouslySelectedNode = newNodesData.find(n=> {
            return n.selected && n.id !== id
        })
        if (previouslySelectedNode) { 
            previouslySelectedNode.selected = false;
        } 
        
        const clickedNode = newNodesData.find(n => n.id === id);
        clickedNode.selected = !clickedNode.selected;
        setNodesData(newNodesData)
    }

    const handleNodeMouseLeave = info => {
        console.log('handleNodeMouseLeave')
        setCreatingEdge(info)
    }

    const handleNodeMove = (id, newX, newY) => {
        const newNodesData = [...nodesData]  // Copy the state 
        const movingNode = newNodesData.find(n => n.id === id)
        movingNode.x = newX
        movingNode.y = newY
        setNodesData(newNodesData)
    }

    const nodes = nodesData.map(n => {
        return (
            <GraphNode 
                key = {n.id}
                properties = {n}
                handleMouseUp = {handleNodeMouseUp}
                handleMouseLeave = {handleNodeMouseLeave}
                handleClick = {handleNodeClicked}
                handleMove = {handleNodeMove}
            />
        )
    })

    /** SVG Handlers -------------------------------------------------------- */
    const svgHandlers = {
        handleMouseUp: () => {
            if (creatingEdge.is) {
                setCreatingEdge(false)
            }
        }
    }

    

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

    function addNode(e) {        
        const newNodesData = [...nodesData]
        console.log(e)
        const newNode = {
            "id": new Date().valueOf(),
            "title": "Created",
            "x": e.clientX,
            "y": e.clientY, //Math.random() * ((dimensions.height * .9) - 50) + 50
        }
        newNodesData.push(newNode)
        setNodesData(newNodesData)
    }

    /** -- JSX Render ------------------------------------------------------- */
    return (
        <svg 
            // width={dimensions.width} 
            // height={dimensions.height} 
            onDoubleClick={addNode}
            onMouseUp={svgHandlers.handleMouseUp}
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
                <path className="link dragline hidden" d="M0,0L0,0"></path>
                <g id="edges-g">
                    {edges}
                </g>
                <g id="nodes-g">
                    {nodes}
                </g>
            </g>
        </svg>
    )
}
