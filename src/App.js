import Button from "./Button";
import styles from "./App.module.css"
function App() {
    return (
        <div>
            <h1 className={styles}>초기 세팅</h1>
            <Button text={"Continue"}/>
        </div>
    );
}

export default App;
