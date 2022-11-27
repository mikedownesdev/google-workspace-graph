import GraphSvg from './GraphSvg.js'
import SearchContainer from './SearchContainer.js'
import './GraphContainer.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react';

// async function getCanvasById(fileId) {
//     console.log(`Attempting to read file with id ${fileId}`)
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     };
//     const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    
//     let res = axios
//         .get(url, config)
//         .then(res => console.log(res))
//         .catch(err=> console.log(err))

//     return res ?? null;
// }


// export async function loader({ params }) {
//     const canvas = await getCanvasById()

//     console.log('canvas')
//     console.log(canvas)
    
//     if (!canvas) {
//       throw new Response("", {
//         status: 404,
//         statusText: "Not Found",
//       })
//     }
//     return canvas
    
//   }

export default function GraphContainer() {    
    const { canvasId } = useParams()
    console.log(canvasId)
    // const { token } = useAuth();
    
    // const [fileId] = useState(canvasId)
    // const [graphJson, setGraphJson] = useState(null)

    // useEffect(() => {
    //     console.log(`Attempting to read file with id ${fileId}`)
    //     const config = {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     };
    //     const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        
    //     let res = axios
    //         .get(url, config)
    //         .then(res => {
    //             console.log(res)
    //             setGraphJson(res)
    //         })
    //         .catch(err=> console.log(err))
    // }, [fileId, token])

    return (
        <div id="graph-container">
            <SearchContainer /> 
            <GraphSvg />
        </div>
    )
}