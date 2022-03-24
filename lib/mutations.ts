// for every time we need to mutate the db, we make a function here

import fetcher from "./fetcher";

export const auth = (mode: 'signin' | 'signup', body: { email: string, password: string }) => {
    return fetcher(`/${mode}`, body);
}