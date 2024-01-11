import { useState } from "react";
import languages from "../languages"
import axios from 'axios'

export default function Translator() {
  const [fromLanguage, setFromLanguage] = useState('en-GB');
  const [toLanguage, setToLanguage] = useState('hi-IN');
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');

  const handleExchangeEvent = () => {
    let temp = fromText;
    setFromText(toText);
    setToText(temp);

    temp = toLanguage;
    setToLanguage(fromLanguage)
    setFromLanguage(temp)
  }

  const copyContent = (content) => {
    navigator.clipboard.writeText(content)
  }

  const utterContent = (content) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(content);
    synth.speak(utterance);
  } 

  const translateText = async () => {
    const result = await axios.get(`https://api.mymemory.translated.net/get?q=${fromText}!&langpair=${fromLanguage}|${toLanguage}`)
    setToText(result.data.responseData.translatedText)
  }

  return (
    <>
      <header>
        <h1>Text Translator</h1>
      </header>
      <div className="container">
        <div className="wrapper">
          <textarea placeholder="Enter Text" className="from-input" value={fromText } onChange={ (e) => setFromText(e.target.value) }></textarea>          
          <textarea className="to-input"  value={ toText } onChange={ (e) => setToText(e.target.value) }></textarea>          

          <div className="controls">
            <div className="from-control">
              <i className="fa-solid fa-copy" onClick={ () => copyContent(fromText) }></i>              
              <i className="fa-solid fa-volume-high" onClick={ () => utterContent(fromText) }></i>

              <select value={ fromLanguage }  className="from-language" onChange={ (e) => setFromLanguage(e.target.value) }>
                {
                  Object.entries(languages).map(([code, name]) => (
                    <option key={ code } value={ code }>{ name }</option>
                  ))
                }
              </select>
            </div>

            <i className="fa-solid fa-arrow-right-arrow-left exchange" onClick= { handleExchangeEvent }></i>

            <div className="to-control">
              <select value={ toLanguage } className="to-language" onChange={ (e) => setToLanguage(e.target.value) }>
              {
                  Object.entries(languages).map(([code, name]) => (
                    <option key={ code } value={ code }>{ name }</option>
                  ))
                }
              </select>
              <i className="fa-solid fa-volume-high" onClick={ () => utterContent(toText) }></i>
              <i className="fa-solid fa-copy" onClick={ () => copyContent(toText) }></i>              
            </div>
          </div>     
        </div>
        <button onClick={ translateText }> Translate Text</button>
      </div>

    </>
  )
}
