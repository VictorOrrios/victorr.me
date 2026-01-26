
export async function getUser(access_token:string):Promise<any>{

    try {
        const res = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Accept': 'application/json'
            }
        });

        if (res.ok) {
            return await res.json();
        } else if (res.status === 401) {
            return null;
        }
    } catch (err) {
        console.error('Error validando token', err);
    }
    
    return null;
}