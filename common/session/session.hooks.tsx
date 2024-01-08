import React from "react";
import AuthContext from "./session.context";
import {UserDetails} from "../types";

export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

export function useActiveUser(): UserDetails {
    const {user,session} = useSession();
    if(user!==null)
    {
        return user;
    }
    else
    {
        throw new Error("Accessing user details without active user");
    }
}
