"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/page.js"; // Make sure this is the correct path

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // If no favorite movies exist, add a default movie
    if (storedFavorites.length === 0) {
      const defaultMovie = {
        id: 999,
        title: "Inception",
        image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        genres: ["Action", "Sci-Fi", "Thriller"],
      };
      
      storedFavorites = [defaultMovie];
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    }

    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold">Favorite Movies</h1>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="border p-4 shadow rounded">
              <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded-md" />
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <p>Genre: {movie.genres.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
