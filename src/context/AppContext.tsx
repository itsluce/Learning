import React, {createContext, useContext, useState, ReactNode} from 'react';

interface AppContextType {
    number: number
    setNumber: React.Dispatch<React.SetStateAction<number>>
    isShow: boolean,
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
    selectedCity: any,
    setSelectedCity: React.Dispatch<React.SetStateAction<any>>
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {

    const [number, setNumber] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [selectedCity, setSelectedCity] = useState<any>('');

    const contextValue: AppContextType = {
        number,
        setNumber,
        isShow,
        setIsShow,
        selectedCity,
        setSelectedCity
    };
    return (
        <AppContext.Provider value={contextValue}>
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