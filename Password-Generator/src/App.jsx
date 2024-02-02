import { useCallback, useEffect, useState, useRef } from "react"

function App() {
  const [password, setPassword] = useState('');
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [text, setText] = useState('Copy Text');
  const [charsAllowed, setCharsAllowed] = useState(() => {
    const storedValue = localStorage.getItem("charsAllowed");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const passwordRef = useRef(null)

    const generateRandomPassword = useCallback(() => {
    let passwordString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let chars = '!@#$%^&*(){}[]'
    let numbers = '0123456789'
    let pass = ''

    if(charsAllowed) {
      passwordString += chars
    }

    if(numbersAllowed) {
      passwordString += numbers
    }

    for(let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * passwordString.length)
      pass += passwordString[randomIndex]
    }

    setPassword(pass)
  }, [length, charsAllowed, numbersAllowed, setPassword])

  useEffect(() => {
    generateRandomPassword()
  }, [generateRandomPassword, length, charsAllowed, numbersAllowed]);

  useEffect(() => {
    localStorage.setItem("charsAllowed", JSON.stringify(charsAllowed));
  }, [charsAllowed]);

  const copyContent = () => {
    passwordRef.current?.select()
    navigator.clipboard.writeText(password)
    setText('Copied!')
    setTimeout(() => {
      setText('Copy Text')
    }, 2500);
  }

  return (
    <>
      <div className="bg-slate-700 h-screen w-full flex flex-col justify-center items-center font-poppins">
        <div className="bg-slate-800 text-center p-6 w-3/5 flex flex-col justify-center items-center rounded-lg shadow">
          <h1 className="font-black text-5xl mb-8  text-yellow-600">Password Generator</h1>   

          <div className="flex shadow rounded-lg overflow-hidden w-3/5 ">
            <input 
              type="text"
              value={ password }
              className="outline-none w-full py-1 px-3"
              readOnly
              ref={ passwordRef }
            />

            <button
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 font-semibold'
              onClick={ () => copyContent() }
            >{ text }</button>
          </div>

          <div className="flex flex-row gap-5 p-5 text-yellow-600 font-bold text-xl">
            <div className="flex flex-row gap-1">
              <input 
                id="length"
                type="range" 
                name="length" 
                value={ length }   
                min={ 8 } 
                max={ 100 }
                onChange={(event) => setLength(event.target.value)}
              />
              <label htmlFor="length">{ length }</label>
            </div>

            <div className="flex flex-row gap-1">
              <input 
                id="characters" 
                defaultChecked={ charsAllowed }
                type="checkbox" 
                name="characters" 
                onChange= { () => setCharsAllowed((prev) => !prev) }
              />
              <label htmlFor="characters">Characters</label>
            </div>

            <div className="flex flex-row gap-1">
              <input 
                id="numbers" 
                defaultChecked={ numbersAllowed }
                type="checkbox" 
                name="numbers" 
                onChange={ () => setNumbersAllowed((prev) => !prev) }
              />
              <label htmlFor="numbers">Numbers</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
