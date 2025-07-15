import React, {createContext, type ReactNode, useContext, useState} from 'react';

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isNew?: boolean;
}

interface AppContextType {
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    chatMessage: ChatMessage[],
    setChatMessage: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
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