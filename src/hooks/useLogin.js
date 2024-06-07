import { useContext } from "react";
import LoginContext from "../context/LoginProvider";

export default function useLogin() {
    return useContext(LoginContext);
}