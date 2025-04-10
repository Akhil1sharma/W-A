import React, { useEffect, useState } from 'react';

export default function FavRecipesPage() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(favs);
  }, []);

  return (
    <div className="fav-page">
      <h2 className="my-recipes-heading">Favourite Recipes</h2>
      {favourites.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No favourites yet!</p>
      ) : (
        <div className="card-container">
          {favourites.map((recipe) => (
            <div key={recipe._id} className="card">
              <div className="card-body">
                <h3 className="title">{recipe.title}</h3>
                <div className="timer">
                  <span>⏱</span>
                  <span>{recipe.time} mins</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
