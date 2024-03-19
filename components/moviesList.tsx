import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from "./movieCard";

interface Movie {
    _id: string;
    title?: string;
    plot?: string;
    note?: string;
    poster?: string;
    directors?: Array<string>;
}
const MoviesList = () => {
    const [listMovies, setListMovies] = useState<Movie[]>([]);
    const [onlyPhoto, setOnlyPhoto] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies');
                setListMovies(response.data.data);
                setOnlyPhoto(response.data.data.filter((movie:Movie) => movie.poster !== null && movie.poster !== undefined));
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, []);

    listMovies.map((movie) => {
        console.log(movie.poster);
    })

    return (
        <div className={"movieList"}>
            {onlyPhoto.length ? (
                onlyPhoto.map((movie) => (
                    <MovieCard key={movie._id} _id={movie._id} poster={movie.poster} directors={movie.directors} rating={movie.imdb.rating} title={movie.title}/>
                ))
            ) : (
                <div>
                    <p>No movies found</p>
                </div>
            )}
        </div>
    );
};

export default MoviesList;
