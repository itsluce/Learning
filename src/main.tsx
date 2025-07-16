import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './animations.css';
import {PrimeReactProvider} from "primereact/api";
import {AppProvider} from "./context/AppContext.tsx";

createRoot(document.getElementById('root')!).render(
    /*سارية مش عارف هون */
    <StrictMode>
        <AppProvider>
            <PrimeReactProvider>
                <App/>
            </PrimeReactProvider>
        </AppProvider>
    </StrictMode>,
)
