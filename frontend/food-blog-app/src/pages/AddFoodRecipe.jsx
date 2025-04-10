import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;

    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const handleQuillChange = (value) => {
    setRecipeData((pre) => ({ ...pre, instructions: value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const { title, time, ingredients, instructions, file } = recipeData;

    if (!title || !time || !ingredients || !instructions || !file) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/recipe", recipeData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': 'bearer ' + localStorage.getItem("token")
        }
      });

      navigate("/myRecipe");
    } catch (err) {
      setError("Something went wrong while submitting.");
    }
  };

  return (
    <div className="add-recipe-page">
      <h2 className="form-title">Add Recipe</h2>
      <div className="container">
        <form className='form' onSubmit={onHandleSubmit}>
          <div className='form-control'>
            <label>Title</label>
            <input type="text" className='input' name="title" onChange={onHandleChange} />
          </div>
          <div className='form-control'>
            <label>Time</label>
            <input type="text" className='input' name="time" onChange={onHandleChange} />
          </div>
          <div className='form-control'>
            <label>Ingredients</label>
            <textarea className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}></textarea>
          </div>
          <div className='form-control'>
            <label>Instructions</label>
            <ReactQuill value={recipeData.instructions || ""} onChange={handleQuillChange} />
          </div>
          <div className='form-control'>
            <label>Recipe Image</label>
            <input type="file" className='input' name="file" onChange={onHandleChange} />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}
