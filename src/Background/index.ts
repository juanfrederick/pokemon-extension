// import browser  from 'webextension-polyfill';

// // Listen for messages sent from other parts of the extension
// browser.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
//     // Log statement if request.popupMounted is true
//     // NOTE: this request is sent in `popup/component.tsx`
//     if (request.popupMounted) {
//         console.log('backgroundPage notified that Popup.tsx has mounted.');
//     }
// });
interface pushDataType{
    pokemonId: number,
    name : string,
    front_default: string,
    nickname: string
    user : string,
    date : string,
    time : string,
}
  

const getRandomPokemon = async () => {
    const randomNumber = Math.round(Math.random() * 898) + 1;
    let test = 0;

    const response = await chrome.storage.local.get()
    const username = await response.username;

    while (true) {
      test = test + 1;
      const response = await fetch(
        `http://localhost:3000/pokemonSaved?user=${username}`
      );
      const data = await response.json();


      const samePokemon = data.filter((val:any) => {
        return val.pokemonId === randomNumber;
      });

      if (samePokemon.length === 0) {
        return randomNumber;
      }

      if (test === 898) {
        throw new Error("All Pokemon Catched");
      }
    }
  };

  const patchCatchedPokemon = async () =>{
    const res = await chrome.storage.local.get()
    const username = await res.username;

    const response = await fetch(
      `http://localhost:3000/user?username=${username}`
    );

    const data = await response.json();
    console.log(data);
    const pokemonCatched = data[0].pokemonCatched;
    const id = data[0].id;

    await fetch(
      `http://localhost:3000/user/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({pokemonCatched: pokemonCatched + 1})
      }
    )
  }

  const getCurrentDate = () => {
    const monthFormat = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date();
    const day = date.getDate();
    const month = monthFormat[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minute = date.getMinutes();

    if (hours > 12) {
      return `${hours - 12}.${minute}PM`;
    } else {
      return `${hours}.${minute}AM`;
    }
  };


chrome.runtime.onMessage.addListener(async (res, req, sendResponse) => {
    if(res.message === "FETCH_POKEMON"){
        const pokeId = await getRandomPokemon()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const data = await response.json();
            
        chrome.storage.local.set({pokemonAppear: data})
    }

    if(res.message === "SAVE_POKEMON"){
        console.log("pokemon saved");

        const data = res.data;
        
        const pushData:pushDataType = {
            pokemonId: data.pokemonId,
            name: data.name,
            front_default: data.front_default,
            nickname: data.nickname ? data.nickname : data.name,
            date: getCurrentDate(),
            time: getCurrentTime(),
            user: data.user,
        };

        fetch("http://localhost:3000/pokemonSaved", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pushData),
        });

        await patchCatchedPokemon();
    }

    console.log(res);
    
    // if(res.aselole){
    //     console.log("ASELOLEEE");
    // }
})