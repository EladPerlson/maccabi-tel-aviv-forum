'use client'    

import { createContext, useContext, useState } from "react";

export interface UserInterface {
    token: string;
    user: {
        email: string;
        id: number;
        password: string;
        username: string;
    };
}

interface AppContextType {
    user: UserInterface | undefined;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserInterface | undefined>(undefined);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppWrapper");
    }
    return context;
}
