import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from '../hooks/useAuth'
import { DriveContext } from '../contexts/DriveContext'

export default function DriveProvider({ children }) {

    const [files, setFiles] = useState(null)
    const { token } = useAuth()

    useEffect(() => {
        if (!token) {
            console.log("No token")
            return
        }
        
        console.log("Attempting to get files")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const url = "https://www.googleapis.com/drive/v3/files?corpora=user";
        
        let res = axios
            .get(url, config)
            .then(res => {
                console.log(res)
                setFiles(res)
            })
            .catch(err=> console.log(err))
    }, [token])

    return (
        <DriveContext.Provider value={files}>
            {children}
        </DriveContext.Provider>
    );
};