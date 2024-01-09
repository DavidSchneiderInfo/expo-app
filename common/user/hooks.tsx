import React from "react";
import {UserContext} from "./index";

export function useActiveUser() {
    return React.useContext(UserContext);
}
