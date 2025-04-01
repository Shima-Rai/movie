"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "../components/page.js";// Make sure this is the correct path

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Movie database
    const allMovies = [
      {
        id: 1,
        title: "Inception",
        image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        releaseDate: "2010-07-16",
        genres: ["Action", "Sci-Fi", "Thriller"],
      },
      {
        id: 2,
        title: "Interstellar",
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        releaseDate: "2014-11-07",
        genres: ["Adventure", "Drama", "Sci-Fi"],
      },
      {
        id: 3,
        title: "The Dark Knight",
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        releaseDate: "2008-07-18",
        genres: ["Action", "Crime", "Drama"],
      }
    ];

    // Filter movies based on title or genre match
    const filteredMovies = allMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchQuery) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(searchQuery))
    );

    setMovies(filteredMovies);
  }, [searchQuery]);

  return (
    <div>
      <NavBar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center">Movies</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded-lg shadow-md">
                <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded-md" />
                <h2 className="mt-2 text-xl font-semibold">{movie.title}</h2>
                <p className="text-gray-600">Release Date: {movie.releaseDate}</p>
                <p className="text-gray-600">Genres: {movie.genres.join(", ")}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
}
