import React from "react";
import {UserDetails} from "../../types";
import AuthContext from "./session.context";

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
    const {user} = useSession();
    if(user!==null)
    {
        return user;
    }
    else
    {
        throw new Error("Accessing user details without active user");
    }
}
