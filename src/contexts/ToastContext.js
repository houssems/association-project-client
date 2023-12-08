import {createContext, useCallback, useEffect, useReducer, useState} from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import {LoginMethodEnums} from "../enums/LoginMethod.enums";
import {Toast, ToastContainer} from "react-bootstrap";

// ----------------------------------------------------------------------

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    REGISTER: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const ToastContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

ToastProvider.propTypes = {
    children: PropTypes.node,
};

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => setToasts(toasts => toasts.slice(1)), 15000);
            return () => clearTimeout(timer);
        }
    }, [toasts]);

    const addToast = useCallback((toast) => setToasts([...toasts, toast]), [setToasts]);

    return (
        <ToastContext.Provider
            value={{
                addToast
            }}
        >
            {children}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
                {
                    toasts.map(toast => (
                        <Toast>
                            <Toast.Header>
                                <strong className="me-auto">{toast.title}</strong>
                            </Toast.Header>
                            <Toast.Body>{toast.content}</Toast.Body>
                        </Toast>
                    ))
                }

            </ToastContainer>
        </ToastContext.Provider>
    );
}

export { ToastContext, ToastProvider };
