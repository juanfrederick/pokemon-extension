import React, { useEffect, useState } from 'react';
import PokemonLogo from '@components/Logo/PokemonLogo';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { setEmail, setUsername, userSignup } from '../../../reducer/userSlice';

const SignupForm = () => {
    const [userValue, setUserValue] = useState<string>('');
    const [emailValue, setEmailValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');
    const [confirmValue, setConfirmValue] = useState<string>('');

    const { email, error, isLoading } = useSelector(
        (state: RootState) => state.user,
    );
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

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

    /** this is for email input handler */
    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    /** this is for username input handler */
    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserValue(e.target.value);
    };

    /** this is for password input handler */
    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    /** this is for confirrm password input handler */
    const confirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmValue(e.target.value);
    };

    /** this is for form onsubmit handler */
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            username: userValue,
            email: emailValue,
            password: passwordValue,
            repeatPassword: confirmValue,
        };
        dispatch(userSignup(data));
    };

    return (
        <div>
            <div className="poke-pu-form_container">
                <PokemonLogo />
                <h1 className="poke-pu-form_heading">Sign Up</h1>
                {error && <p className="poke-pu-form_error">{error}</p>}
                <form
                    action="submit"
                    className="poke-pu-form_form"
                    onSubmit={submitHandler}
                >
                    <label htmlFor="email" className="poke-pu-form_label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="poke-pu-form_input"
                        value={emailValue}
                        onChange={emailHandler}
                        required
                    />
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
                    <label htmlFor="confirm" className="poke-pu-form_label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm"
                        className="poke-pu-form_input"
                        value={confirmValue}
                        onChange={confirmHandler}
                        required
                    />
                    <button
                        className="poke-pu-form_button"
                        disabled={isLoading}
                    >
                        Sign up
                    </button>
                </form>
                <p className="poke-pu-form_have-account">
                    Already have an account?{' '}
                    <Link to="/" className="poke-pu-form_link">
                        Sign in
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
