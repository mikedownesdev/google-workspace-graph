import { useContext } from "react";
import { DriveContext } from "../contexts/DriveContext";
export function useDrive() { return useContext(DriveContext); }