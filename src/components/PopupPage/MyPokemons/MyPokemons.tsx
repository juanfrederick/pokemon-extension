import React, { useEffect } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import { fetchPokemon, deletePokemon } from '../../../reducer/userSlice';
import { useNavigate } from 'react-router-dom';

const MyPokemons = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { username, pokemon } = useSelector((state: RootState) => {
        return state.user;
    });

    const navigate = useNavigate();

    /** This is for getting user pokemon data */
    useEffect(() => {
        if (username) {
            dispatch(fetchPokemon(username));
        }
    }, []);

    /** This is for release the pokemon */
    const releaseHandler = (id: number) => {
        dispatch(deletePokemon(id));
    };

    return (
        <div className="poke-pu-mypoke-container">
            <div
                className="poke-pu-mypoke_back-container"
                onClick={() => navigate('/')}
            >
                <ArrowBack />
                <p className="poke-pu-mypoke_back-pg">Back</p>
            </div>
            <h1 className="poke-pu-mypoke_heading">My Pokemons</h1>
            <div className="poke-pu-mypoke_divider"></div>
            {pokemon.length > 0 ? (
                pokemon.map((val: any) => {
                    console.log(val);

                    return (
                        <div
                            className="poke-pu-mypoke_card-container"
                            key={val.id}
                        >
                            <img
                                src={val.front_default}
                                alt={val.name}
                                className="poke-pu-mypoke_card-image"
                            />
                            <div className="poke-pu-mypoke_card-details">
                                <div>
                                    <h2 className="poke-pu-mypoke_card-details-nickname">
                                        {val.nickname.charAt(0).toUpperCase() +
                                            val.nickname.slice(1)}
                                    </h2>
                                    <p className="poke-pu-mypoke_card-details-name">
                                        {val.name.charAt(0).toUpperCase() +
                                            val.name.slice(1)}
                                    </p>
                                </div>
                                <button
                                    className="poke-pu-mypoke_card-release-btn"
                                    onClick={() => releaseHandler(val.id)}
                                >
                                    Release
                                </button>
                            </div>
                            <p className="poke-pu-mypoke_card-details-date">
                                Catched on {val.date}, {val.time}.
                            </p>
                        </div>
                    );
                })
            ) : (
                <div className="poke-pu-mypoke_nopoke">
                    <h1 className="poke-pu-mypoke_card-details-nickname">
                        You Have No Pokemon
                    </h1>
                    <p className="poke-pu-mypoke_card-details-name">
                        Click pokeball icon to catch a pokemon
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyPokemons;
