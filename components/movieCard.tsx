import React, {useEffect, useState} from 'react';
import axios from "axios";
import Image from 'next/image'

interface Movie {
    _id: string;
    title?: string;
    plot?: string;
    poster?: string;
    directors?: Array<string>;
}

const MovieCard = (selectedMovie:Movie) => {
    console.log(selectedMovie)

    if(!selectedMovie) {
        return <p>Loading...</p>
    }
    return (
        <div className={"movieCard"}>
            <Image
                // @ts-ignore
                src={selectedMovie.poster}
                alt="Poster not found"
                width={200}
                height={300}
            />
            <div className={"movieCard--body"}>
                <h2 className={"movieCard--name"}>{selectedMovie.title}</h2>
                {selectedMovie.directors ? (
                    <p className={"movieCard--directors"}>By {selectedMovie.directors.join(', ')}</p>
                ) : null}
            </div>
        </div>
    );
};

export default MovieCard;