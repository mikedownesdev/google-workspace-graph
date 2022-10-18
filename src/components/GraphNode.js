import { useEffect, useState, useRef } from "react";
import * as d3 from 'd3'

function getClass(selected) {
    if (selected) {
        return "conceptG selected" 
    } else {
        return "conceptG" 
    }
}

/**
 * 
 * @param {*} props.data
 * @param {*} props.data.x
 * @param {*} props.data.y
 * @returns 
 */
export default function GraphNode({data, handlers}) {

    let [coordinates, setCoordinates] = useState(
        {xPos: data.x, yPos: data.y}
    )

    let renderCount = useRef(1)

    // let [xPos] = useState(x)
    // let [yPos] = useState(y)
    // let positionString = `translate(${coordinates.xPos},${coordinates.yPos})`

    let positionString = `translate(${data.x},${data.y})`


    // function handleDragStart() {
    //     console.log('Drag is starting:')
    //     handlers.handleNodeDragStart(data.id)
    //     // handlers.handleNodeDragStart()
    // }
    // function handleDrag() {
    //     console.log("Dragging...")
    //     // console.log(this)
    //     // TODO I'm not sure we really need to use the setCoordinates
    //     // method here. We can simply update the state when we the drag
    //     // has ended
    //     // setCoordinates({
    //     //     xPos: d3.event.x, 
    //     //     yPos: d3.event.y
    //     // }) 
    //     // handlers.handleNodeDrag()
    // }
    // function handleDragEnd() {
    //     console.log("Drag complete!")
    //     handlers.handleNodeDragEnd(data.id)
    //     // console.log(this)
    //     // setCoordinates({
    //     //     xPos: d3.event.sourceEvent.x, 
    //     //     yPos: d3.event.sourceEvent.y
    //     // }) 
    //     // handlers.handleNodeDragEnd()
    // }

    /**
     * The d3 drag origin is used to determine the starting position of the 
     * element. This makes sure that the drag behavior preserves the OFFSET
     * between the mouse position and the starting element during the drag.
     * 
     * If no origin is specified, when the drag starts moving, the element
     * will move to where the mouse is which can be as a jump on the screen.
     * In most cases, you'll want to define the origin to avoid this behavior.
     */
    let dragBehavior = d3.behavior.drag()
        .origin(() => { return { x: d3.event.x, y: d3.event.y }; })
        .on("dragstart", () => { handlers.handleNodeDragStart(data.id) })
        .on("drag", () => { handlers.handleNodeDrag(data.id) })
        .on("dragend", () => { handlers.handleNodeDragEnd(data.id) })
        // TODO @Evan
        // .on("dragstart", handlers.onNodeDragStart)
        // .on("drag", handlers.onNodeDrag)
        // .on("dragend", handlers.onNodeDragEnd)

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    })

    
    useEffect(() => {
        let g = d3.select(`#n-${data.id}`)
        g.call(dragBehavior)
        // return () => { g.on() }
    }, []) // No dependencies means that this will only run upon mount

    // function onMouseDown(e) {
    //     let circle = d3.select(e.target)
    //     console.log(circle)
    // }

    return (
        <g id={`n-${data.id}`} 
        className={getClass(data.selected)}
        draggable="true" 
        onClick={() => handlers.handleNodeClicked(data.id)}
        transform={positionString}>
            <circle r="50"></circle>
            <text textAnchor="middle" dy="-7.5">
                <tspan>{data.title}</tspan>
                <tspan x="0" dy="15">{renderCount.current}</tspan>
            </text>
        </g>
    )
}

// Put old version aside for safe keeping

// export default function GraphNode({id,x,y,title = "Default"}) {

//     let [coordinates, setCoordinates] = useState({xPos: x, yPos: y})

//     // let [xPos] = useState(x)
//     // let [yPos] = useState(y)
//     let positionString = `translate(${coordinates.xPos},${coordinates.yPos})`


//     function handleDragStart() {
//         console.log('Drag is starting:')
//     }
//     function handleDragMove() {
//         console.log("Dragging...")
//         // TODO I'm not sure we really need to use the setCoordinates
//         // method here. We can simply update the state when we the drag
//         // has ended
//         setCoordinates({
//             xPos: d3.event.x, 
//             yPos: d3.event.y
//         }) 
//     }
//     function handleDragEnd() {
//         console.log("Drag complete!")
//         // console.log(d3.event.sourceEvent.x)
//         setCoordinates({
//             xPos: d3.event.sourceEvent.x, 
//             yPos: d3.event.sourceEvent.y
//         }) 
//     }

//     /**
//      * The d3 drag origin is used to determine the starting position of the 
//      * element. This makes sure that the drag behavior preserves the OFFSET
//      * between the mouse position and the starting element during the drag.
//      * 
//      * If no origin is specified, when the drag starts moving, the element
//      * will move to where the mouse is which can be as a jump on the screen.
//      * In most cases, you'll want to define the origin to avoid this behavior.
//      */
//     let dragBehavior = d3.behavior.drag()
//         .origin(() => { return { x: d3.event.x, y: d3.event.y }; })
//         .on("dragstart", handleDragStart)
//         .on("drag", handleDragMove)
//         .on("dragend", handleDragEnd)

    
//     useEffect(() => {
//         let g = d3.select(`#n-${id}`)
//         g.call(dragBehavior)
//         // return () => { g.on() }
//     }, []) // No dependencies means that this will only run upon mount

//     // function onMouseDown(e) {
//     //     let circle = d3.select(e.target)
//     //     console.log(circle)
//     // }

//     return (
//         <g id={`n-${id}`} 
//         className="conceptG" 
//         draggable="true" 
//         transform={positionString}>
//             <circle r="50"></circle>
//             <text textAnchor="middle" dy="-7.5">
//                 <tspan>{title}</tspan>
//                 <tspan x="0" dy="15">variable</tspan>
//             </text>
//         </g>
//     )
// }