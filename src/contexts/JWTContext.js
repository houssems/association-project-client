import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
import {LoginMethodEnums} from "../enums/LoginMethod.enums";

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

const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState, () => {});

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);

                    const response = await axios.get('/v1/auth/me');

                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user: response.data,
                        },
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (loginMethod, args) => {
        try {
            let response;

            switch (loginMethod) {
                case LoginMethodEnums.DEFAULT:
                    const {email, password} = args;
                    response = await axios.post('/v1/auth/email/login', {
                        email,
                        password,
                    });
                    break;
                case LoginMethodEnums.FACEBOOK:
                    const {accessToken} = args;
                    response = await axios.post('/v1/auth/facebook/login', {
                        accessToken
                    });
                    break;
                default:
                    break;

            }

            const { token, user } = response.data;

            setSession(token);
            dispatch({
                type: 'LOGIN',
                payload: {
                    user,
                },
            });

            return true;
        } catch(e) {
            console.error(e);
            return false;
        }

    };

    const register = async (email, password, firstName, lastName) => {
        const response = await axios.post('/api/account/register', {
            email,
            password,
            firstName,
            lastName,
        });
        const { accessToken, user } = response.data;

        window.localStorage.setItem('accessToken', accessToken);
        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        });
    };

    const logout = async () => {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    };

    const getInitials = () => {
        return `${state.user.firstName[0]} ${state.user.lastName[0]}`;
    }

    const getFullName = () => {
        return `${state.user.firstName} ${state.user.lastName}`;
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,
                getInitials,
                getFullName,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
