import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const CurrencyExchange = () => {
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [exchangeRates, setExchangeRates] = useState({});
  const accessKey = "aeefa681277fa76bb3e2518beb673beb"; // Replace with your actual API key

  const currencies = [
    { value: "EUR", label: "Euro" },
    { value: "USD", label: "US Dollar" },
    { value: "GBP", label: "British Pound" },
    { value: "TRY", label: "Turkish Lira" },
    { value: "AUD", label: "Australian Dollar" },
    { value: "IDR", label: "Indonesia Rupiah" },
    { value: "AED", label: "United Arab Emirates Dirham" },
    { value: "CNY", label: "China Yuan Renminbi" },
    { value: "HKD", label: "ong Kong Dollar" },
    { value: "INR", label: "India Rupee" },
    { value: "JPY", label: "Japan Yen" },
    { value: "KRW", label: "Korea (South) Won" },
    { value: "LAK", label: "Laos Kip" },
    { value: "MMK", label: "Myanmar (Burma) Kyat" },
    { value: "MYR", label: "Malaysia Ringgit" },
    { value: "NGN", label: "Nigeria Naira" },
    { value: "PHP", label: "Philippines Peso" },
    { value: "QAR", label: "Qatar Riyal" },
    { value: "RUB", label: "Russia Ruble" },
    { value: "SAR", label: "Saudi Arabia Riyal" },
    { value: "SGD", label: "Singapore Dollar" },
    { value: "THB", label: "Thailand Baht" },
    { value: "VND", label: "Viet Nam Dong" },
    // Add more currencies here
  ];

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = () => {
    axios
      .get(`http://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}`)
      .then((response) => {
        setExchangeRates(response.data.rates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleBaseCurrencyChange = (selectedOption) => {
    setBaseCurrency(selectedOption.value);
  };

  const handleTargetCurrencyChange = (selectedOption) => {
    setTargetCurrency(selectedOption.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const convertCurrency = () => {
    const baseRate = exchangeRates[baseCurrency];
    const targetRate = exchangeRates[targetCurrency];

    if (baseRate && targetRate) {
      const convertedAmount = (amount / baseRate) * targetRate;
      const formattedAmount = convertedAmount.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      });
      return formattedAmount;
    }

    return "Invalid currency";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500 text-red-600">
      <div className="con">
        <h2 className="font-bold text-4xl font-sans mb-4 text-black">Currency Exchange</h2>
        <p className="font-semibold font-sans ">Penukaran Nilai Mata Uang Negara</p>
        <br />
        <br />
        <div className="Curr_list">
          <label className="font-bold text-xl font-sans text-yellow-500">Mata Uang Awal:</label>
          <Select
            className="flex justify-center"
            options={currencies}
            value={currencies.find((curr) => curr.value === baseCurrency)}
            onChange={handleBaseCurrencyChange}
            styles={{
              control: (provided) => ({
                ...provided,
                width: "150px", // Adjust the width as needed
              }),
              menu: (provided) => ({
                ...provided,
                width: "150px", // Adjust the width as needed
              }),
            }}
          />

          <label>&nbsp;</label>

          <label className="font-bold text-xl font-sans text-green-600">Mata Uang Generate:</label>
          <Select
            className="flex justify-center"
            options={currencies}
            value={currencies.find((curr) => curr.value === targetCurrency)}
            onChange={handleTargetCurrencyChange}
            styles={{
              control: (provided) => ({
                ...provided,
                width: "150px", // Adjust the width as needed
              }),
              menu: (provided) => ({
                ...provided,
                width: "150px", // Adjust the width as needed
              }),
            }}
          />
        </div>
        <label>&nbsp;</label>

        <div className="input-container">
          <input required="required" type="number" value={amount} onChange={handleAmountChange} placeholder="Amount" name="text" className="input" />
          <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="3em" viewBox="0 0 448 512">
            <path
              fill="#46416C"
              d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z"
            />
          </svg>
          <input type="text" readOnly value={`${convertCurrency()} ${targetCurrency}`} className="input-disabled" />
        </div>
        <label className="font-semibold font-sans text-xl text-black">My Contact :</label>
        <div className="flex mt-4">
          <a href="https://www.linkedin.com/in/ahmad-afriza-ez4-ab9173276/">
            <img className="w-8 h-8 text-gray-500" src="/linkedin.png" alt="" />
          </a>
          <a className="ml-8" href="https://www.instagram.com/ahmdfrizza/?hl=en">
            <img className="w-8 h-8 text-gray-500" src="/instagram.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;
