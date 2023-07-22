import React from "react";
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button variant="contained" style={{ margin: "20px" }} color="primary" onClick={() => loginWithRedirect()}>Log In</Button>;
};
