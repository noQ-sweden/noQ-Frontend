import { useContext } from "react";
import HostContext from "../context/HostProvider";

export default function useHost() {
    return useContext(HostContext);
}