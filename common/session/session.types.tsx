import {UserDetails} from "../types";

export type AuthContextType = {
    signIn: (email: string, password: string) => void;
    signUp: (username: string, password: string, email: string, birthday: Date) => void;
    signOut: () => void;
    session?: string | null,
    isLoading: boolean
    user: null | UserDetails
};
