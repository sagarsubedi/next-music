// abstract away http fetching mechanism because we need this later for hooks
export default function fetcher(url: string, data = undefined) {
    return fetch(`${window.location.origin}/api${url}`,
        {
            method: data ? 'POST' : 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
    ).then((res) => {
        if (res.status > 299 && res.status < 400) {
            throw new Error;
        }
        return res.json()
    });
};
