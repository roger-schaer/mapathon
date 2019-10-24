export default async function(url, getTokenSilently, loginWithRedirect, body) {
    try {
        let token = await getTokenSilently();

        let response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        let data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
        await loginWithRedirect();
    }
}