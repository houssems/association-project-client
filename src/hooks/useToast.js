import { useContext } from 'react';
//
import {ToastContext} from "../contexts/ToastContext";

// ----------------------------------------------------------------------

const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) throw new Error('Toast context must be use inside ToastProvider');

    return context;
};

export default useToast;