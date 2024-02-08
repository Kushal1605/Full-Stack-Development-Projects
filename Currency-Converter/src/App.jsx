/* eslint-disable no-unused-vars */

import InputBox from "./components/InputBox";
import { useState } from "react";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";

function App() {
  const [toCurrency, setToCurrency] = useState('usd');
  const [fromCurrency, setFromCurrency] = useState('inr');
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const data = useCurrencyInfo(fromCurrency)
  const options = Object.keys(data)

  const swap = () => {
    const tempCurrency = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const convert = () => {
    setToAmount(fromAmount * data[toCurrency])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-blue-900"
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={fromAmount}
                currency={fromCurrency}
                onAmountChange={(amount) => setFromAmount(amount)}
                onCurrencyChange={(currency) => setFromCurrency(fromAmount)}
                options={options}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-900"
                onClick={swap}     
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={toAmount}
                currency={toCurrency}
                onCurrencyChange={(currency) => setToCurrency(currency)}
                readOnly
                options={options}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;