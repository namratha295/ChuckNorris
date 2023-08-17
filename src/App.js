import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentJoke, setCurrentJoke] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const getJoke = () => {
    if (currentCategory === "") {
      axios.get("https://api.chucknorris.io/jokes/random").then((res) => {
        setCurrentJoke(res.data.value);
        setShowPopup(true);
      });
    } else {
      axios
        .get(
          `https://api.chucknorris.io/jokes/random?category=${currentCategory}`
        )
        .then((res) => {
          setCurrentJoke(res.data.value);
          setShowPopup(true);
        });
    }
  };

  useEffect(() => {
    axios.get("https://api.chucknorris.io/jokes/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="h-fit flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-gray-700">
      <h1 className="m-3 text-4xl text-green-500 animate-bounce font-bold">
        Chuck Norris
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-4 bg-transparent text-white text-lg md:gap-y-3 md:w-fit">
        {categories.map((cat) => (
          <button
            key={cat}
            className="shadow-xl w-16 h-6 md:w-60 md:h-40 bg-[#FFFFFF] text-center m-3 rounded-md hover:border border-black capitalize text-white text-lg"
            value={cat} id={cat} onClick={() => { setCurrentCategory(cat); getJoke();}}
          >
            <h2 className="text-blue-900 font-bold capitalize text-sm md:text-2xl md:pt-6">
              {cat}
            </h2>
            <p className="capitalize text-purple-800 text-sm lg:block md:block hidden">
              Unlimited Jokes On {cat}
            </p>
          </button>
        ))}
      </div>
      {showPopup && (
      <div className="absolute shadow-2xl md:top-56 top-72 lg:rounded-md card p-5 lg:w-1/2 md:w-1/2 bg-[linear-gradient(90deg,#2c5364,#203a43,#0f2027)]">
        <div className="bg-white p-5 rounded-md shadow-xl relative bg-[linear-gradient(90deg,#2c5364,#203a43,#0f2027)] border-black">
          <button className="absolute top-2 right-2 text-white" onClick={() => setShowPopup(false)}>
            <CloseIcon></CloseIcon>
          </button>
          <h1 className="text-center text-3xl text-white font-bold capitalize">
          <span class=" block capitalize text-3xl text-white">{currentCategory} </span>
          </h1>
          <div class="w-full border border-black m-auto mt-6 shadow-xl flex flex-col items-center justify-center">
            <p class="text-center font-semibold text-blue-100 font-sans m-5 text-xl md:text-3xl">"{currentJoke}"</p>
            <button class="px-4 py-2 bg-blue-700 my-2 mx-3 cursor-pointer lg:w-96 md:96 rounded-md hover:bg-blue-600 font-bold " onClick={() => getJoke()}>Next joke</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
