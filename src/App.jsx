import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumallow] = useState(false);
  const [charAllowed, setcharallow] = useState(false);
  const [password, setpassword] = useState("");
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()_+{}[]:;<>?/|";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setpassword(pass);
  }, [length, numallowed, charAllowed, setpassword])

  const passwordselect = useCallback(() => {
    passwordref.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password])



  useEffect(() => {
    passwordGenerator()
  }, [length, numallowed, charAllowed, passwordGenerator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 '>
        <h1 className="text-white text-center my-3 "> Password Generator </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" className="outline-none w-full py-1 px-3 " value={password} placeholder="Password" readOnly ref={passwordref} />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 strink-0" onClick={passwordselect}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1  ">
            <input type="range" min={8} max={100} value={length}
              className="cursor-pointer  " onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numallowed}
              id="numberinput"
              onChange={() => { setNumallow((prev) => !prev) }}
            />
            <label htmlFor="numberinput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1 ">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="charinput"
              onChange={() => { setcharallow((prev) => !prev) }}
            />
            <label htmlFor="numberinput">Characters</label>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
