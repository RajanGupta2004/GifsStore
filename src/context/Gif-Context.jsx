import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gif, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourite, setFavourite] = useState([]);
  const gf = new GiphyFetch(import.meta.env.VITE_GIF_KEY);
  // console.log(favourite);

  const addToFavorite = (id) => {
    if (favourite.includes(id)) {
      const updatedFavourite = favourite.filter((item) => item.id != id);
      localStorage.setItem("favouriteGIFs", JSON.stringify(updatedFavourite));
      setFavourite(updatedFavourite);
    } else {
      const updatedFavourite = [...favourite];
      updatedFavourite.push(id);
      localStorage.setItem("favouriteGIFs", JSON.stringify(updatedFavourite));
      setFavourite(updatedFavourite);
    }
  };

  useEffect(() => {
    const favourite = JSON.parse(localStorage.getItem("favouriteGIFs")) || [];
    setFavourite(favourite);
  }, []);
  return (
    <GifContext.Provider
      value={{
        gf,
        gif,
        setGifs,
        filter,
        setFilter,
        favourite,
        setFavourite,
        addToFavorite,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
