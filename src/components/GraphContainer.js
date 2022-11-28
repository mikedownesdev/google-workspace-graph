import GraphSvg from './GraphSvg.js'
import SearchContainer from './SearchContainer.js'
import './GraphContainer.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react';
import { getDag } from "../api/getDag";

// async function getCanvasById(canvasId) {
//     console.log(`Attempting to read file with id ${canvasId}`)
//     const config = {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     };
//     const url = `https://www.googleapis.com/drive/v3/files/${canvasId}?alt=media`;
    
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
    const { token } = useAuth();
    const [graphJson, setGraphJson] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    console.log(`isLoading: ${isLoading}`)


    // const graphJson = getDag();

    useEffect(() => {
        setIsLoading(true)
        console.log(`Attempting to read file with id ${canvasId}`)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const url = `https://www.googleapis.com/drive/v3/files/${canvasId}?alt=media`;
        
        axios
            .get(url, config)
            .then(res => {
                console.log(res)
                setGraphJson(res.data)
            })
            .catch(err=> console.log(err))
            .finally(() => setIsLoading(false))
    }, [canvasId, token])

    return (
        <div id="graph-container">
            {
                isLoading && <div>LOADING</div>
            }
            {
                !isLoading && (
                    <>
                        <SearchContainer /> 
                        <GraphSvg graphJson={graphJson}/>
                    </>
                )
            }
        </div>
    )
}