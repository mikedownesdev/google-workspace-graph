import GraphSvg from './GraphSvg.js'
import SearchContainer from './SearchContainer.js'
import './GraphContainer.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react';

export default function GraphContainer() {    
    const { canvasId } = useParams()
    const { token } = useAuth();
    const [graphJson, setGraphJson] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const url = `https://www.googleapis.com/drive/v3/files/${canvasId}?alt=media`;
        console.log(`GET ${url}`)
        
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
                isLoading && 
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
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