import { useEffect, useState } from "react";
import * as d3 from 'd3'

export default function GraphNode({id,x,y,title = "Default"}) {

    let [coordinates, setCoordinates] = useState({xPos: x, yPos: y})

    // let [xPos] = useState(x)
    // let [yPos] = useState(y)
    let positionString = `translate(${coordinates.xPos},${coordinates.yPos})`


    function handleDragStart() {
        console.log('Drag is starting:')
    }
    function handleDragMove() {
        console.log("Dragging...")
        setCoordinates({
            xPos: d3.event.x, 
            yPos: d3.event.y
        }) 
    }
    function handleDragEnd() {
        console.log("Drag complete!")
        // console.log(d3.event.sourceEvent.x)
        setCoordinates({
            xPos: d3.event.sourceEvent.x, 
            yPos: d3.event.sourceEvent.y
        }) 
    }

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
        .on("dragstart", handleDragStart)
        .on("drag", handleDragMove)
        .on("dragend", handleDragEnd)

    
    useEffect(() => {
        let g = d3.select(`#n-${id}`)
        g.call(dragBehavior)
        // return () => { g.on() }
    }, []) // No dependencies means that this will only run upon mount

    // function onMouseDown(e) {
    //     let circle = d3.select(e.target)
    //     console.log(circle)
    // }
    
    



    // g.call(dragBehavior)

    return (
        <g id={`n-${id}`} 
        className="conceptG" 
        draggable="true" 
        transform={positionString}>
            <circle r="50"></circle>
            <text textAnchor="middle" dy="-7.5">
                <tspan>{title}</tspan>
                <tspan x="0" dy="15">variable</tspan>
            </text>
        </g>
    )
}