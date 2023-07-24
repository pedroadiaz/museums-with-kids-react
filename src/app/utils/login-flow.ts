import { LocalStorageCache, User } from "@auth0/auth0-react";
import { IUser } from "../interfaces/user";
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

export const loginFlow = async (auth0User: User | undefined): Promise<IUser | string | undefined> => {
    let internalUser: IUser | undefined = undefined;
    if (!auth0User) {
        return undefined;
    }
    const headers = {
        "Content-Type": "application/json"
    };

    let response;

    try {
        response = await axios.get(`${process.env.NX_API_URL}/users/email?email=${auth0User?.email}`, {
            headers: headers
        });

        const users = response.data.data as IUser[];

        if (users.length === 0) {
            response = { status: 404, data: null };
        } else {
            internalUser = users[0];
            localStorage.setItem("user", JSON.stringify(internalUser));
            if (!internalUser.paid) {
                const subscriptionResponse = await axios.post(`${process.env.NX_API_URL}/checkout`, {
                    headers: headers
                });
        
                return subscriptionResponse.data.url as string;
            }
        }
    } catch (error) {
        response = { status: 404, data: null };
        console.log(error);
    }

    
    if (response.status === 404) {
        internalUser = {
            id: uuidv4(),
            email: auth0User?.email,
            active: true,
            firstName: auth0User?.given_name ?? auth0User.name,
            lastName: auth0User?.family_name,
            paid: false,
            isAdmin: false,
            createdDate: new Date
          };
        
        const createdResponse = await axios.post(`${process.env.NX_API_URL}/users`, internalUser, {
            headers: headers
        });

        if (createdResponse.status === 201) {
            const subscriptionResponse = await axios.post(`${process.env.NX_API_URL}/checkout`, {
                headers: headers
            });

            return subscriptionResponse.data.url as string;
        }

    }

    return internalUser;
}