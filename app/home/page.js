"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/page.js"; 

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(new Set()); // To track favorite movies
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const sampleMovies = [
      { id: 1, title: "Inception", year: 2010, rating: 8.8, image: "https://static.toiimg.com/photo/msid-6177430/6177430.jpg?57181" },
      { id: 2, title: "Interstellar", year: 2014, rating: 8.6, image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
      { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
      { id: 4, title: "Avatar", year: 2009, rating: 7.8, image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" }
    ];
    setMovies(sampleMovies);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  // Toggle favorite movie
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div>
      {/* Navbar */}
      <NavBar search={search} setSearch={setSearch} />

      {/* Movies Grid */}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Recommended Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
              <img 
                src={movie.image} 
                alt={movie.title} 
                className="w-full h-64 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
              <p className="text-gray-600">Year: {movie.year}</p>
              <p className="text-yellow-500">⭐ {movie.rating}</p>
              
              {/* Buttons */}
              <div className="flex justify-between w-full mt-2">
                {/* Details Button */}
                <button 
                  onClick={() => router.push(`/details/${movie.id}`)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Details
                </button>
                
                {/* Favorite Button */}
                <button 
                  onClick={() => toggleFavorite(movie.id)} 
                  className={`px-4 py-2 rounded-md ${favorites.has(movie.id) ? "bg-red-500 text-white" : "bg-gray-300 text-black"}`}>
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
