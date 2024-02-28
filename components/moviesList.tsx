import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from "./movieCard";

interface Movie {
    _id: string;
    title: string;
    plot: string;
}

const MoviesList = () => {
    const [listMovies, setListMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies');
                setListMovies(response.data.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    console.log(listMovies)

    return (
        <div>
            {listMovies ? (
                listMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie._id}/>
                ))) : (
                    <div>
                        <p>No movies found</p>
                    </div>

            )}
        </div>
    );
};

export default MoviesList;
