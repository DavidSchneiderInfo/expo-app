import React from "react";
import {AuthContextType} from "./session.types";

const AuthContext = React.createContext<AuthContextType>({
    session: null,
    isLoading: true,
    user: null,
    signIn: () => {},
    signUp: () => {},
    signOut: () => {},
});

export default AuthContext;
