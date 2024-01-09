import React, {createContext} from "react";
import {UserContextType} from "./types";

export const UserContext = createContext<UserContextType>({
    user: null,
    isLoading: true,
});
