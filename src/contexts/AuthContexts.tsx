import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type UserType = {
    id: string;
    user: string;
    avatar: string;
}

type AuthContextType = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>();

    async function signInWithGoogle() {
        const login = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(login);

        if (result.user) {
            const { displayName, photoURL, uid } = result.user

            if (!displayName || !photoURL) {
                throw new Error("Está faltando informações na conta Google. (Foto ou Nome)");
            }

            setUser({
                id: uid,
                user: displayName,
                avatar: photoURL
            })
        }
    }

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user

                if (!displayName || !photoURL) {
                    throw new Error("Está faltando informações na conta Google. (Foto ou Nome)");
                }

                setUser({
                    id: uid,
                    user: displayName,
                    avatar: photoURL
                })
            }
        })
        return () => {
            unsubscribe();
        }

    }, [])
    
    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>

    );
}

