import ThridPartyPage from '@components/ThirdPartyPage/ThridPartyPage';
import React, { useEffect, useState } from 'react';

const ContentScript = () => {
    const [isCatching, setIsCatching] = useState<boolean>(false);

    /** This is for get the message for popup */
    chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse,
    ) {
        /** for showing or unshow the pokeball */
        if (request.catchingStatus != undefined) {
            // sendResponse({
            //     status: `Pokeball showed: ${request.catchingStatus}`,
            // });
            chrome.storage.local.get().then(res => {
                setIsCatching(res.isCatching);
            });
        }

        /** for logout */
        if (request.isLogout) {
            setIsCatching(false);
        }
    });

    useEffect(() => {
        /**this is for not reseting the old state*/
        chrome.storage.local.get().then(res => {
            setIsCatching(res.isCatching);
        });
    }, []);

    return <div className="poke-cs">{isCatching && <ThridPartyPage />}</div>;
};

export default ContentScript;
