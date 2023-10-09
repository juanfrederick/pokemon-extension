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

// Pokemon
chrome.runtime.onMessage.addListener(async (res, req, sendResponse) => {
  // This is for fetch random pokemon when message sent is "FETCH_POKEMON"
  if(res.message === "FETCH_POKEMON"){
    const pokeId = await getRandomPokemon()
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    const data = await response.json();
    
    // This is for saving pokemon to local storage
    chrome.storage.local.set({pokemonAppear: data}, async ()=>{
      // for get tab id
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      // For sending message to content script
      if(typeof tab.id === "number"){
        chrome.tabs.sendMessage(tab.id, ({message:"POKEMON_SAVED"}))
      }
    })
  }

  // This is for post pokemon after pokemon appear when message sent is "SAVE_POKEMON"
  if(res.message === "SAVE_POKEMON"){
    // get the pokemon appear data
    const data = res.data;
    
    // data for post to server
    const pushData:pushDataType = {
        pokemonId: data.pokemonId,
        name: data.name,
        front_default: data.front_default,
        nickname: data.nickname ? data.nickname : data.name,
        date: getCurrentDate(),
        time: getCurrentTime(),
        user: data.user,
    };

    // Post data to server
    fetch("http://localhost:3000/pokemonSaved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pushData),
    });

    // Update cathched pokemon
    await patchCatchedPokemon();
}
    
})

// User
chrome.runtime.onMessage.addListener((res, req, sendResponse) => {
  /** User Login */
  if(res.message === "USER_LOGIN"){
    const {username, password} = res.data;

    fetch(`http://localhost:3000/user?username=${username}`)
      .then(res => res.json())
      .then(res => {
        // this is for check if username registered or not
        if(res.length === 0){
          throw Error("Username not found!");
        }

        // this is for check if username and password wrong
        if (res[0].password !== password) {
          throw Error("Wrong Password!");
        }

        // Sending response back to popup
        sendResponse({data: res[0], isLoading: false})

        // Set email and username to chrome local storage
        chrome.storage.local.set({
          email: res[0].email,
          username: res[0].username
        })
      })
      .catch(err => {
        // Sending error response to popup
        sendResponse({error: err.message, isLoading: false})
      })
  }

  /** User signup */
  if(res.message === "USER_SIGNUP"){
    const {username, email, password, repeatPassword} = res.data;

    // getting user by username
    fetch(`http://localhost:3000/user?username=${username}`)
      .then(res => res.json())
      .then(res => {
        // check if username already exist
        if(res.length > 0){
          throw Error("Username already exist!");
        } else{
          return fetch(`http://localhost:3000/user?email=${email}`)
        }
      })
      .then(res => res.json())
      .then(res => {
        // check if email already exist
        if(res.length > 0){
          throw Error("Email already exist!");
        } 
        
        if (password !== repeatPassword) {
          // check if password valid
          throw Error("Password not same");
        } else{
          // post new user
          return (
            fetch("http://localhost:3000/user", {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
            },
              body: JSON.stringify({
              username,
              email,
              password,
              pokemonCatched: 0,
              })
            })
          )
        }
      })
      .then(res => res.json())
      .then(res => {
        sendResponse({data: res, isLoading: false})
        // Set semail and username to storage
        chrome.storage.local.set({
          email: res.email,
          username: res.username
        })
      })
      .catch(err => {
        // sending error
        sendResponse({error: err.message, isLoading: false})
      });
    }

    /** User Pokemon */
    if(res.message === "FETCH_CATCHED_POKEMON"){
      const {username} = res
      fetch(`http://localhost:3000/pokemonSaved?user=${username}`)
        .then(res => res.json())
        .then(res => {
          sendResponse({pokemon: res})
        })
    }

    /** Release Pokemon */
    if(res.message === "USER_RELEASE_POKEMON"){
      const {id} = res;

      fetch(`http://localhost:3000/pokemonSaved/${id}`, {
        method: "DELETE",
      }).then(res => {
        if(res.ok){
          sendResponse({deleted: true})
        }
      })
    }

    /** Fetch user detail */
    if(res.message === "FETCH_USER"){
      const {username} = res;
      fetch(`http://localhost:3000/user?username=${username}`)
        .then(res => res.json())
        .then(res => {
          sendResponse({user: res[0]})
        });
    }

    return true;
})