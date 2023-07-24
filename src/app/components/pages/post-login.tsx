import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { loginFlow } from 'src/app/utils/login-flow';
import { CircularProgressThing } from '../common/circular-progress';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

export const PostLogin = () => {
    const { user, isLoading } = useAuth0();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    console.log("user: ", user);

    if (user) {
        useEffect(() => {
            loginFlow(user)
            .then((u) => {
            if (u) {
                console.log("internal user: ", u);
                if (typeof u === "string") {
                    window.location.href = u;
                } else {
                    navigate("/dashboard");
                }
            }
            });
        }, []);
    } else {
        useEffect(() => {

        });
    }

    return (
        <>
            {isLoading && loading && (
            <div style={{textAlign:"center"}}>
                Logging you in...
                <CircularProgressThing loading={loading} />
            </div>
            )}
        </>
    )
}