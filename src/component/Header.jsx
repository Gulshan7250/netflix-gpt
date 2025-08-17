import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../../utils/constants";
import { toggleGptSearchView } from "../../utils/gptSlice";
import lang from "../../utils/languageConstants";
import { changeLanguage } from "../../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoUrl: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        // ...
      }
    });

    // Unsubsribe when compount unmounts
    return () => unSubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Togle GPT Search
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) =>{
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && ( <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
          )}
          <button
            className="py-2 px-4 mx-4 m-2 bg-purple-800 text-white rounded-lg cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {showGptSearch? "Homepage": "GPT Search"}
          </button>

          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoUrl}
            alt="userlogo"
          />
          <button
            onClick={handleSignout}
            className="font-bold text-white border bg-red-500 cursor-pointer border-red-500 px-4 py-0.5 rounded mx-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
