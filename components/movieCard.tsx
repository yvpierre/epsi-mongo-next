import React, {useEffect, useState} from 'react';
import axios from "axios";
import Image from 'next/image'

interface Movie {
    _id: string;
    title?: string;
    plot?: string;
    poster?: string;
    rating?: string;
    directors?: Array<string>;
}

const MovieCard = (selectedMovie:Movie) => {
    console.log(selectedMovie)

    if(!selectedMovie) {
        return <p>Loading...</p>
    }
    return (
        <div className={"movieCard"}>
            <div className="imageWrapper">
                <Image
                    // @ts-ignore
                    src={selectedMovie.poster}
                    alt="Poster not found"
                    width={200}
                    height={300}
                />
            </div>
            <div className={"movieCard--body"}>
                <h2 className={"movieCard--name"}>{selectedMovie.title}</h2>
                <div className={"movieCard--infos"}>
                    {selectedMovie.directors ? (
                        <p className={"movieCard--directors"}>By {selectedMovie.directors.join(', ')}</p>
                    ) : null}
                    {selectedMovie.rating ? (
                        <p className={"movieCard--note"}>{selectedMovie.rating}*</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;