import { useContext } from "react";
import HeaderContext from "../context/HeaderProvider";

export default function useHeader() {
    return useContext(HeaderContext);
}