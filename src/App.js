import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";

function App() {
    const [counter, setValue] = useState(0);
    const onClick = () => setValue((prev)=> prev+1);
    console.log("i run all the time");
    useEffect(() => {
        console.log("CALL THE API..");
    }, []);
    return (
        <div>
            <h1 className={styles.title}>초기 세팅</h1>
            <Button text={"Continue"}/>
            <h2>{counter}</h2>
            <button onClick={onClick}>Click me</button>

        </div>
    );
}

export default App;