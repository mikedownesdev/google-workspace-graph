import { createContext } from 'react';

export const AuthContext = createContext({ 
    access_token: null,
    authuser: null,
    expires_in: null,
    prompt: null,
    scope: null,
    token_type: null,
});