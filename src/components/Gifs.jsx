import React from "react";
import { Link } from "react-router-dom";

const Gifs = ({ gif, hover = true }) => {
  // console.log(gif.images.fixed_width.webp);
  return (
    <>
      <Link to={`/${gif.type}/${gif.slug}`}>
        <div className="w-full  mb-2 relative cursor-pointer group">
          <img
            src={gif?.images?.fixed_width?.webp}
            className="w-full rounded object-cover transition-all duration-300"
            alt="img"
          />
          {hover && (
            <div className="absolute   bottom-1 inset-0 rounded opacity-0 group-hover:opacity-100 bg-gradient-to-b from-transparent to-black flex items-end gap-2 p-2">
              <img src={gif?.user?.avatar_url} alt="img" className="h-8" />
              <span className="font-bold ">{gif?.user?.display_name}</span>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Gifs;
