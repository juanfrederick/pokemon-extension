import { useSelector } from "react-redux";
import { RootState } from "src/store";

interface saveType{
  pokemonId: number,
  name : string,
  front_default: string,
  nickname: string
  user : string,
}

interface pushDataType extends saveType{
  date : string,
  time : string,
}

const useCatchPokemon = () => {

    const {username} = useSelector((state:RootState)=>{
      return state.user
    })
    const getRandomPokemon = async () => {
        const randomNumber = Math.round(Math.random() * 898) + 1;
        let test = 0;
    
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

      const fetchPokemon = async () => {
        const pokeId = await getRandomPokemon()
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const data = await response.json();
        return data
      };

      const patchCatchedPokemon = async () =>{
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

      const savePokemon = async ({pokemonId,
        name,
        front_default,
        nickname,
        user }:saveType) => {
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

        const pushData:pushDataType = {
          pokemonId: pokemonId,
          name,
          front_default,
          nickname: nickname ? nickname :name,
          date: getCurrentDate(),
          time: getCurrentTime(),
          user,
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

      return {fetchPokemon, savePokemon}
    
}

export default useCatchPokemon;