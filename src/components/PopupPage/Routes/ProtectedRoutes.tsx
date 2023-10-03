import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';

interface Props {
    children: JSX.Element | JSX.Element[];
}

const ProtectedRoutes = ({ children }: Props) => {
    const { email } = useSelector((state: RootState) => {
        return state.user;
    });

    const navigate = useNavigate();

    /** for validating */
    useEffect(() => {
        if (email === null) {
            navigate('/signin');
        }
    }, []);

    return children;
};

export default ProtectedRoutes;
