import axios from 'axios';
import { string } from 'three/tsl';

export type ghMessage = {
    id:string,
    user:string|null,
    avatar:string|null,
    link:string|null,
    text:string,
    date:string|null
}

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
        console.error('Error getting user', err);
    }
    
    return null;
}

export async function postChatMessage(access_token:string, text:string):Promise<any>{
    const url = 'http://localhost:3000/api/chat/send';

    try {
        const response = await axios.post(
            url,
            {
                access_token,
                text
            },
            {
            headers: {
                'Content-Type': 'application/json',
            },
            },
        );

        return response.data;
    } catch (error) {
        console.error('Error posting message', error);
    }

    return null;

}

export function formatDate(dateS:string):string{
    const date = new Date(dateS);

    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = String(date.getFullYear()).slice(-2);

    const hours = String(date.getHours()).padStart(2,'0');
    const minutes = String(date.getMinutes()).padStart(2,'0');

    return `${day}/${month}/${year}@${hours}:${minutes}`;
}

export async function getAllMessages():Promise<ghMessage[]>{
    const url = 'http://localhost:3000/api/chat';

    try {
        const response = await axios.get(
            url,
            {
            headers: {
                'Accept': 'application/json'
            },
            },
        );
        let ret:ghMessage[] = []
        response.data.forEach((msm:any) => {
            ret.push({
                id:msm.id,
                user:msm.name,
                avatar:msm.avatar,
                link:msm.link,
                date:formatDate(msm.createdAt),
                text:msm.text
            })
        });
        return ret;
    } catch (error) {
        console.error('Error getting all messages', error);
    }

    return []
}