import { createContext } from 'react';

export const UserContext = createContext({ 
    email: null,
    picture: null,
    name: null,
    family_name: null,
    given_name: null,
 });