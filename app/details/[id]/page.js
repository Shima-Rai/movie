"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import NavBar from "../../components/page.js";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Movie database
    const movies = [
      {
        id: 1,
        title: "Inception",
        image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        releaseDate: "2010-07-16",
        genres: ["Action", "Sci-Fi", "Thriller"],
        description: "A skilled thief uses dream-sharing technology to plant an idea in someone's mind, but his own past haunts him.",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy"],
        rating: "8.8",
        recommendations: ["Interstellar", "Tenet", "The Matrix"]
      },
      {
        id: 2,
        title: "Interstellar",
        image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        releaseDate: "2014-11-07",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"],
        rating: "8.6",
        recommendations: ["Inception", "Gravity", "The Martian"]
      },
      {
        id: 3,
        title: "The Dark Knight",
        image: "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg",
        releaseDate: "2008-07-18",
        genres: ["Action", "Crime", "Drama"],
        description: "Batman faces his greatest challenge as the criminal mastermind known as the Joker plunges Gotham into anarchy.",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Gary Oldman"],
        rating: "9.0",
        recommendations: ["Batman Begins", "Joker", "Logan"]
      }
    ];

    // Find the movie based on ID
    const selectedMovie = movies.find((m) => m.id === parseInt(id));
    
    if (selectedMovie) {
      setMovie(selectedMovie);
    } else {
      router.push("/movies"); // Redirect to movies if not found
    }
  }, [id, router]);

  if (!movie) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <img src={movie.image} alt={movie.title} className="w-full h-96 object-cover rounded-md mb-4" />
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-600">Release Date: {movie.releaseDate}</p>
          <p className="text-gray-600">Genres: {movie.genres.join(", ")}</p>
          <p className="mt-4">{movie.description}</p>

          <h2 className="mt-6 text-xl font-semibold">Cast</h2>
          <ul className="list-disc list-inside">
            {movie.cast.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>

          <h2 className="mt-6 text-xl font-semibold">User Rating</h2>
          <p className="text-gray-600">{movie.rating}/10</p>

          <h2 className="mt-6 text-xl font-semibold">Recommended Movies</h2>
          <ul className="list-disc list-inside">
            {movie.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
