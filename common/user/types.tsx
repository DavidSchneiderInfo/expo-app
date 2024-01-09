import {UserDetails} from "../types";

export type UserContextType = {
    user: UserDetails | null,
    setUser: (user: UserDetails | null) => void;
    isLoading: boolean,
}
