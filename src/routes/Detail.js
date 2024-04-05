import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Movie from "../components/Movie";

function Detail() {
    const [loading, setLoading] = useState(true);
    const [movies,setMovies] = useState("");
    const {id} = useParams();
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovies(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    }, []);
    console.log(movies);
    return (
        <div>
            { loading ? <h1>Loading...</h1> :
                <div>
                    <img src={movies.large_cover_image} alt={movies.title}/>
                    <h2>
                        <Link to={movies.url}>{movies.title}</Link>
                    </h2>
                    <h2>{movies.title_long}</h2>
                    <p>{movies.rating}</p>
                    <p>{movies.runtime}</p>
                    <p>{movies.like_count}</p>
                    <ul>
                        {movies.genres.map(g => (
                                <li key={g}>{g}</li>
                            )
                        )}
                    </ul>
                </div>
            }
        </div>
    );
}

export default Detail;