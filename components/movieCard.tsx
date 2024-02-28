import React, {useEffect, useState} from 'react';
import axios from "axios";


interface Movie {
    _id: string;
    title: string;
    plot: string;
}

const MovieCard = (selectedMovie:Movie) => {
    const [fetchedMovie, setFetchedMovie] = useState<Movie | null>(null);
    useEffect(() => {
        const fetchMovie = async() => {
            try {
                const response = await axios.get(`/api/movie/${selectedMovie._id}`);
                setFetchedMovie(response.data.data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        }
        fetchMovie()
    }, [])

    if(!fetchedMovie) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.plot}</p>
        </div>
    );
};

export default MovieCard;