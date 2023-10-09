import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { setBallIsClicked } from '../../../reducer/pokemonSlice';

interface Props {
    id: number;
    name: string;
    image: string;
}

const CatchSuccess = ({ id, name, image }: Props) => {
    const [nicknameVal, setNicknameVal] = useState<string>('');
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const { username } = useSelector((state: RootState) => {
        return state.user;
    });

    const dispatch = useDispatch<AppDispatch>();

    /** function for nickname input handler */
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNicknameVal(e.target.value);
    };

    /** Function for form submit */
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            pokemonId: id,
            name,
            front_default: image,
            nickname: nicknameVal,
            user: username!,
        };
        // await savePokemon(data);
        chrome.runtime.sendMessage({ message: 'SAVE_POKEMON', data });
        setIsSaved(true);
    };

    /** handler to close the modal */
    const returnHandler = async () => {
        dispatch(setBallIsClicked(false));
    };

    return (
        <div className="poke-cs-catch-success_container">
            <img
                src={image}
                alt={name}
                className="poke-cs-catch-success_image"
            />
            {!isSaved && (
                <div className="poke-cs-catch-success_form-container">
                    <h1 className="poke-cs-catch-success_heading">
                        Congratulations!
                    </h1>
                    <p className="poke-cs-catch-success_pg">
                        You've found{' '}
                        <span className="poke-cs-catch-success_bold">
                            {name.charAt(0).toUpperCase() + name.slice(1)}!
                        </span>
                    </p>
                    <form
                        action="submit"
                        className="poke-cs-catch-success_form"
                        onSubmit={submitHandler}
                    >
                        <label
                            htmlFor="nickname"
                            className="poke-cs-catch-success_label"
                        >
                            Nickname
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            className="poke-cs-catch-success_input"
                            onChange={inputHandler}
                            value={nicknameVal}
                        />
                        <button className="poke-cs-catch-success_button">
                            Save
                        </button>
                    </form>
                </div>
            )}
            {isSaved && (
                <div className="poke-cs-catch-success_form-container">
                    <h1 className="poke-cs-catch-success_heading">
                        {name.charAt(0).toUpperCase() + name.slice(1)} saved to
                        your backpack
                    </h1>
                    <button
                        className="poke-cs-catch-success_button"
                        onClick={returnHandler}
                    >
                        Return
                    </button>
                </div>
            )}
        </div>
    );
};

export default CatchSuccess;
