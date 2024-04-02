import {useEffect, useState} from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [movies,setMovies] = useState([]);
    const getMpvies = async () => {
        const json = await (await fetch(
            `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year&language=ko-KR&page=1`
        )).json();
        setMovies(json.data.movies);
        setLoading(false);
    }
    useEffect(() => {
        getMpvies();
    }, []);
    console.log(movies);
    return (
        <div>
            { loading ? <h1>Loading...</h1> : null }
        </div>
    );
}

export default App;