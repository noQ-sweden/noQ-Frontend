import { useContext } from "react";
import HostOverviewUpdateContext from "../context/HostOverviewUpdateProvider";

export default function useUpdate() {
    return useContext(HostOverviewUpdateContext);
}