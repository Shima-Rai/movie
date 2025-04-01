"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/movies?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img 
          src="https://images-platform.99static.com/5lb0N1dkmNTgUjbwzGG421d1RSE=/500x500/top/smart/99designs-contests-attachments/5/5368/attachment_5368528" 
          alt="Logo" 
          className="w-10 h-10" 
        />
        <div className="text-xl font-bold">Movie Recommender</div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          className="w-[500px] bg-[#808080] border shadow rounded p-2 text-black"
          placeholder="Search by movie title or genre..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={handleSearch} 
          className="bg-white text-blue-700 rounded px-4 py-2 flex items-center justify-center"
        >
          Search
        </button>
      </div>
      <button 
  onClick={() => router.push("/favorites")} 
  className="bg-yellow-500 px-4 py-2 rounded-md"
>
  Favorites
</button>


      {/* Profile & Logout Buttons */}
      <div className="flex gap-4">
        <button className="bg-gray-700 px-4 py-2 rounded-md">Profile</button>
        <button 
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }} 
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
