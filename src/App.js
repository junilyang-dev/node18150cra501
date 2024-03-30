import Button from "./Button";
import styles from "./App.module.css";
import {useState, useEffect} from "react";

function Hello() {
    useEffect(() => {
        console.log("hi:D");
        return () => console.log("bye:X");
    }, []);
    return <h1>Hello</h1>;
}

function App() {
    const [counter, setValue] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [showing, setShowing] = useState(false);
    const onClick = () => setValue((prev)=> prev+1);
    const onChange = (event) => setKeyword(event.target.value);
    const onShowing = () => setShowing((prev) => !prev);
    useEffect(() => {
        console.log("I run only once.");
    }, []);
    useEffect(() => {
        console.log("I run when 'keyword' changes,Search for", keyword);
    }, [keyword]);
    useEffect(() => {
        console.log("I run when 'counter' changes,Count for", counter);
    }, [counter]);
    useEffect(() => {
        console.log("I run when 'keyword & counter' changes");
    }, [keyword,counter]);
    return (
        <div>

            <h1 className={styles.title}>초기 세팅</h1>
            <Button text={"Continue"}/>
            <hr/>
            <input value={keyword} onChange={onChange} type="text" placeholder="Search here..."/>
            <h2>{counter}</h2>
            <button onClick={onClick}>Click me</button>
            <hr/>
            {showing ? <Hello/> : null}
            <button onClick={onShowing}>{showing ? "Hide" : "Show"}</button>
        </div>
    );
}

export default App;