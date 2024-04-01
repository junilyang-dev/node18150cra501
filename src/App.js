import {useEffect, useState} from "react";

function App() {
    //로딩여부
    const [loading, setLoading] = useState(true);
    //api를 통한 데이터 리스트
    const [coins, setCoins] = useState([]);
    //input 입력 값
    const [inputValue, setInputValue] = useState(0);
    //구매가능 코인 개수
    const [getCoin, setGetCoin] = useState(0);
    //select 선택 값
    const [selCoin, setSelCoin] = useState(0);
    //select로 선택한 coin리스트(1개)
    const [selCoinList, setSelCoinList] = useState([]);
    //API를 통해 코인 리스트 가져오기
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                //코인 리스트 전체 담기
                setCoins(json);
                //로딩 값 변경
                setLoading(false);
                //select 기본 값 부여
                setSelCoin(json[0].quotes.USD.price);
                //select로 선택한 coin리스트(1개) 기본 값 가져오기
                setSelCoinList(json[0]);
            });
    }, []);
    //input 입력 시 동작
    const onChange = (event) => {
        //input 값 변경
        setInputValue(event.target.value);
        //계산
        calculateCoins(event.target.value, selCoin);
    }
    //select 변경 시 동작
    const onChangeSelect = (event) => {
        //select 값 변경
        setSelCoin(event.target.value);
        //select로 선택한 coin리스트(1개) 기본 값 가져오기
        setSelCoinList(coins[event.target.selectedIndex]);
        //계산
        calculateCoins(inputValue, event.target.value);
    }
    //계산
    const calculateCoins = (amount, pricePerCoin) => {
        const numCoins = amount / pricePerCoin;
        //계산 결과
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
                    <h1>구매 가능 코인: {getCoin != 0 ? selCoinList.name + "(" + selCoinList.symbol + ") "+getCoin + " 개" : '입력값을 확인해주세요.'}</h1>
                </>
            )}
        </div>
    );
}

export default App;