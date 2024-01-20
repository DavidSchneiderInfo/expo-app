import {MatchResponse, ProfileDetails, ProfileUpdate, UserAuthentication} from "../types";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const makeApiRequest = async (url: string, options: any) => {
    return await fetch(url, options).then((response) => {
        if(response.status!==200 && response.status!==201)
        {
            console.error("Unexpected response code during API call");
            switch (response.status)
            {
                case 500:
                    return Promise.reject("Server Error");
                case 429:
                    return Promise.reject("Too many requests");
                case 401:
                    return Promise.reject("These credentials are incorrect");
                default:
                    return Promise.reject("Invalid response status code: " + response.status);
            }
        }
        return response;
    });
}

function useApi() {
    const requestSignUp = async (username: string, password: string, email: string, birthday: Date): Promise<UserAuthentication> => {
        return await makeApiRequest(apiUrl + 'auth/sign-up', {
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
                if(response.status!==200)
                {
                    switch (response.status)
                    {
                        case 500:
                            throw Error('Server error.');
                        case 409:
                            throw Error('These credentials are already taken.');
                        default:
                            throw Error('Invalid response status code: ' + response.status);
                    }
                }
                return response.json();
            })
            .then((response: UserAuthentication) => {
                return response;
            })
            .catch((error) => Promise.reject(error));
    }

    const requestSignIn = async (email: string, password: string): Promise<UserAuthentication> => {
        return await makeApiRequest(apiUrl + 'auth/sign-in', {
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

    const refreshSession = async (token: string): Promise<UserAuthentication> => {
        return await makeApiRequest(apiUrl + 'auth/refresh', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((response: UserAuthentication) => {
                return response;
            });
    }

    const setUserData = async (token: string, details: ProfileUpdate): Promise<ProfileDetails> => {
        return await makeApiRequest(apiUrl + 'user', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(details),
        })
            .then((response) => response.json());
    }

    const getProfiles = async (token: string): Promise<ProfileDetails[]> => {
        return await makeApiRequest(apiUrl + 'match', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                return response;
            });
    }

    const likeProfile = async (token: string, profileId: number): Promise<MatchResponse> => {
        return await makeApiRequest(apiUrl + 'match', {
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

    return {
        requestSignUp,
        requestSignIn,
        refreshSession,
        setUserData,
        getProfiles,
        likeProfile
    };
}

export default useApi;
