import {MatchResponse, ProfileDetails, UserAuthentication, UserDetails} from "../types";
import {ImagePickerAsset} from "expo-image-picker";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

function useApi() {
    const requestSignUp = async (username: string, password: string, email: string, birthday: Date): Promise<UserAuthentication> => {
        return await fetch(apiUrl + 'auth/sign-up', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                birthday: birthday.toISOString().split('T')[0],
            }),
        })
            .then((response) => {
                if(response.status===422) {
                    console.log(response.json())
                    throw Error('These credentials are already taken.');
                }
                return response.json();
            })
            .then((response: UserAuthentication) => {
                return response;
            });
    }

    const requestSignIn = async (email: string, password: string): Promise<UserAuthentication> => {
        return await fetch(apiUrl + 'auth/sign-in', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((response: UserAuthentication) => {
                return response;
            });
    }

    const getUserData = async (token: string): Promise<UserDetails> => {
        return await fetch(apiUrl + 'user', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((response: UserDetails) => {
                return response;
            });
    }

    const setUserData = async (token: string, details: {
        name: string;
        email: string;
        birthday: string;
        bio: string | null;
    }): Promise<UserDetails> => {
        return await fetch(apiUrl + 'user', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(details),
        })
            .then((response) => response.json())
            .then((response: UserDetails) => {
                return response;
            });
    }

    const setAvatar = async (token: string, photo: string): Promise<UserDetails> => {
        return await fetch(apiUrl + 'user/avatar', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                photo: photo
            }),
        })
            .then((response) => response.json())
            .then((response: UserDetails) => {
                return response;
            });
    }

    const getProfiles = async (token: string): Promise<ProfileDetails[]> => {
        return await fetch(apiUrl + 'match', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                console.log(response.status);
                console.log("Body");
                return response.json();
            })
            .then((response) => {
                console.log(response);
                return response;
            });
    }

    const likeProfile = async (token: string, profileId: number): Promise<MatchResponse> => {
        return await fetch(apiUrl + 'match', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                user_id: profileId
            }),
        })
            .then((response) => response.json())
            .then((response: MatchResponse) => {
                return response;
            });
    }

    const uploadMedia = async (token: string, asset: ImagePickerAsset): Promise<void> => {
        let filename = asset.uri.split('/').pop();

        if(!filename)
            throw new Error("Invalid filename");

        await fetch(apiUrl + 'upload/media', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                if(response.status!==200)
                    throw new Error("Validation failed.")
                return;
            }).catch((error: Error) => console.log(error.message));
    }

    return {
        requestSignUp,
        requestSignIn,
        getUserData,
        setUserData,
        setAvatar,
        getProfiles,
        likeProfile,
        uploadMedia
    };
};

export default useApi;
