import React, { useState, useEffect } from 'react';
import PokemonLogo from '@components/Logo/PokemonLogo';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setUsername, userLogin } from '../../../reducer/userSlice';

import { AppDispatch, RootState } from 'src/store';

const LoginForm = () => {
    const [userValue, setUserValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { email, error, isLoading } = useSelector(
        (state: RootState) => state.user,
    );

    /** This is for directing to the main menu when user not logout */
    useEffect(() => {
        if (email) {
            navigate('/');
        }

        chrome.storage.local.get().then(result => {
            if (result.email) {
                dispatch(setEmail(result.email));
            }

            if (result.username) {
                dispatch(setUsername(result.username));
            }
        });
    }, [email]);

    /** this is for onsubmit handler */
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogin({ username: userValue, password: passwordValue }));
    };

    /** this is for username input handler */
    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserValue(e.target.value);
    };

    /** this is for password input handler */
    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    return (
        <div className="poke-pu-form_container">
            <PokemonLogo />
            <h1 className="poke-pu-form_heading">Login</h1>
            {error && <p className="poke-pu-form_error">{error}</p>}
            <form
                action="submit"
                className="poke-pu-form_form"
                onSubmit={submitHandler}
            >
                <label htmlFor="username" className="poke-pu-form_label">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="poke-pu-form_input"
                    value={userValue}
                    onChange={usernameHandler}
                    required
                />
                <label htmlFor="password" className="poke-pu-form_label">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="poke-pu-form_input"
                    value={passwordValue}
                    onChange={passwordHandler}
                    required
                />
                <button className="poke-pu-form_button" disabled={isLoading}>
                    Sign in
                </button>
            </form>
            <p className="poke-pu-form_have-account">
                Don't have an account?{' '}
                <Link to="/signup" className="poke-pu-form_link">
                    Sign up
                </Link>
                .
            </p>
        </div>
    );
};

export default LoginForm;
