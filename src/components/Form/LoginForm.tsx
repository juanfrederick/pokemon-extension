import React, { useState, useEffect } from 'react';
import PokemonLogo from '@components/Logo/PokemonLogo';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, userLogin } from '../../reducer/userSlice';

import { AppDispatch, RootState } from 'src/store';

const LoginForm = () => {
    const [userValue, setUserValue] = useState<string>('');
    const [passwordValue, setPasswordValue] = useState<string>('');

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { email, error, isLoading } = useSelector(
        (state: RootState) => state.user,
    );

    useEffect(() => {
        if (email) {
            navigate('/');
        }

        if (localStorage.getItem('user')) {
            dispatch(setEmail(localStorage.getItem('user')));
        }
    }, [email]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userLogin({ username: userValue, password: passwordValue }));
    };

    const usernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserValue(e.target.value);
    };

    const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    return (
        <div className="p-10 bg-white flex flex-col gap-8 w-[400px] relative">
            <PokemonLogo />
            <h1 className="font-semibold text-5xl text-default-400">Login</h1>
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
                <button
                    className="w-full py-3 bg-info text-plain-200 font-bold rounded-xl"
                    disabled={isLoading}
                >
                    Sign in
                </button>
            </form>
            <p className="text-default-100 font-semibold text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-default-400">
                    Sign up
                </Link>
                .
            </p>
        </div>
    );
};

export default LoginForm;
