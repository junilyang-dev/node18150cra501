import Button from "./Button";
import styles from "./App.module.css"
import { useState } from "react";

function App() {
    const [counter, setValue] = useState(0);
    const onClick = () => setValue((prev) => prev + 1);
    return (
        <div>
            <h1>{counter}</h1>
                <button onClick={onClick}>click me</button>
        </div>
    );
}

export default App;
