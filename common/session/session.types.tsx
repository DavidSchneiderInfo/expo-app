import {UserAuthentication} from "../types";

export type AuthContextType = {
    signIn: (email: string, password: string) => void;
    signUp: (username: string, password: string, email: string, birthday: Date) => void;
    signOut: () => void;
    refresh: () => UserAuthentication | void;
    session?: UserAuthentication | null;
    isLoading: boolean;
};
