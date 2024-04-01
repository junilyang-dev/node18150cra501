import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    const [getCoin, setGetCoin] = useState(0);
    const [selCoin, setSelCoin] = useState(0);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
                setSelCoin(json[0].quotes.USD.price);
            });
    }, []);
    const onChange = (event) => {
        setInputValue(event.target.value);
        calculateCoins(event.target.value, selCoin);
    }
    const onChangeSelect = (event) => {
        setSelCoin(event.target.value);
        console.log(event.target.value);
        calculateCoins(inputValue, event.target.value);
    }
    const calculateCoins = (amount, pricePerCoin) => {
        const numCoins = amount / pricePerCoin;
        setGetCoin(numCoins);
    };
    useEffect(() => {

    }, [inputValue,getCoin]);
    return (
        <div>
          <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
            {loading ? <strong>Loading...</strong> : (
                <>
                    <select value={selCoin} onChange={onChangeSelect}>
                        {coins.map((coin) => (
                            <option key={coin.id} value={coin.quotes.USD.price}>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}USD</option>
                        ))}
                    </select>
                    <hr/>
                    <input type="number" value={inputValue} onChange={onChange} placeholder="구매 가격을 입력하세요."/>
                    <h1>{getCoin.toFixed(2)}</h1>
                </>
            )}
        </div>
    );
}

export default App;