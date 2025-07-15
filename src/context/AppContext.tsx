import React, {createContext, type ReactNode, useContext, useState} from 'react';

interface AppContextType {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    chatMessage: any[],
    setChatMessage: React.Dispatch<React.SetStateAction<any[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);


interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    const [message, setMessage] = useState<string>('');
    const [chatMessage, setChatMessage] = useState([]);

    const value: AppContextType = {
        message,
        setMessage,
        chatMessage,
        setChatMessage
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};