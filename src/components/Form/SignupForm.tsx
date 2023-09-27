import React, { useEffect, useState } from 'react';
import PokemonLogo from '@components/Logo/PokemonLogo';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { setEmail, userSignup } from '../../reducer/userSlice';

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

    useEffect(() => {
        if (email) {
            navigate('/');
        }

        if (localStorage.getItem('user')) {
            dispatch(setEmail(localStorage.getItem('user')));
        }
    }, [email]);

    const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserValue(e.target.value);
    };

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const confirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmValue(e.target.value);
    };

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
            <div className="p-10 bg-white flex flex-col gap-8 w-[400px]">
                <PokemonLogo />
                <h1 className="font-semibold text-5xl text-default-400">
                    Sign Up
                </h1>
                {error && (
                    <p className="text-error font-semibold absolute top-56">
                        {error}
                    </p>
                )}
                <form
                    action="submit"
                    className="flex flex-col mt-8 gap-3"
                    onSubmit={submitHandler}
                >
                    <label
                        htmlFor="email"
                        className="text-default-500 font-semibold text-[15px]"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-plain-100 text-default-300 p-3 w-full font-semibold text-[15px] rounded-xl"
                        value={emailValue}
                        onChange={emailHandler}
                        required
                    />
                    <label
                        htmlFor="username"
                        className="text-default-500 font-semibold text-[15px]"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="bg-plain-100 text-default-300 p-3 w-full font-semibold text-[15px] rounded-xl"
                        value={userValue}
                        onChange={usernameHandler}
                        required
                    />
                    <label
                        htmlFor="password"
                        className="text-default-500 font-semibold text-[15px]"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-plain-100 text-default-300 p-3 w-full font-semibold text-[15px] rounded-xl"
                        value={passwordValue}
                        onChange={passwordHandler}
                        required
                    />
                    <label
                        htmlFor="confirm"
                        className="text-default-500 font-semibold text-[15px]"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirm"
                        className="bg-plain-100 text-default-300 p-3 w-full font-semibold text-[15px] rounded-xl"
                        value={confirmValue}
                        onChange={confirmHandler}
                        required
                    />
                    <button
                        className="w-full py-3 bg-info text-plain-200 font-bold rounded-xl"
                        disabled={isLoading}
                    >
                        Sign up
                    </button>
                </form>
                <p className="text-default-100 font-semibold text-sm">
                    Already have an account?{' '}
                    <Link to="/" className="text-default-400">
                        Sign in
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
