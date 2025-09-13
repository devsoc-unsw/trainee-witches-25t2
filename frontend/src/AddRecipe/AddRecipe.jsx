import './AddRecipe.css';
import React, { useState } from 'react';

const AddRecipe = () => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (input.trim() && !tags.includes(input)) {
      setTags([...tags, input.trim()]);
    }
    setInput('');
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const splitNewLines = (text) => {
      if (!text.trim()) return [];
      return text.split('\n').filter(line => line.trim()).map(line => line.trim());
    };

    const formData = {
      name: recipeTitle,
      ingredients: splitNewLines(ingredients),
      steps: splitNewLines(steps),
      tags: tags,
      image: uploadedImage
    };

    try {
      // TODO: put the url somewhere so it's not hardcoded each time
      // TODO: maybe make api helpers too
      const res = await fetch("http://localhost:8080/recipe/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
      })

      const data = await res.json();
      console.log("res: ", data);

      if (res.ok) {
        const recipeId = data.recipe._id; // mongodb generated
        window.location.href = `/recipeDetail/${recipeId}`;
      } else {
        alert("Error: ", data.message);
      }
    } catch (error) {
      console.log("Error submitting: ", error)
    }
  };

  return (
    <>
      <div id='add-recipe-page'>
        <header id='add-recipe-header'>
          <button id='back-btn' onClick={()=>{window.location.href=`/dishcover`}}>←</button>
          <h1>Add recipe</h1>
          <img src="../MainLogo.png" alt='Logo' id='logo' onClick={()=>{window.location.href=`/dishcover`}} />
        </header>

        <form onSubmit={handleSubmit} id='form'>
          {/* Image upload */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload" id='img-upload'>
            <img 
              className='img' 
              src={uploadedImage || 'https://orders.goodthymes.ca/assets/img/goodthymes/default-menu-image-placeholder.png'}
              // 'https://i.pinimg.com/1200x/2b/20/62/2b2062a2a26856d1e17a1da7df7c7b56.jpg'}
              alt="Recipe image"
            />
            {!uploadedImage && (
              <p type='button' id='upload-img-btn'>
                Upload image
              </p>
            )}
            {uploadedImage && (
              <p type='button' id='upload-img-btn'>
                Change image
              </p>
            )}
          </label>

          {/* Recipe title */}
          <input
            type="text"
            id='recipe-title'
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
            placeholder="Recipe title"
            required
          />

          <div className='input-grp'>
            <h3>Ingredients</h3>
            <div className='text-box'>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="1 pound penne pasta&#10;1 tablespoon olive oil&#10;8 Italian sausages"
                style={{
                  width: '100%',
                  minHeight: '120px',
                  border: 'none',
                  outline: 'none',
                  resize: 'vertical',
                  background: 'transparent',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                required
              />
            </div>
          </div>

          <div className='input-grp'>
            <h3>Steps</h3>
            <div className='text-box'>
              <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Cook pasta in boiling salted water until al dente&#10;Heat olive oil in a large skillet&#10;Add sausage and brown over high heat"
                style={{
                  width: '100%',
                  minHeight: '120px',
                  border: 'none',
                  outline: 'none',
                  resize: 'vertical',
                  background: 'transparent',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                required
              />
            </div>
          </div>

          <div className='input-grp'>
            <h3>Add tags so people can discover your recipe!</h3>
            <p className='subtext'>Key ingredients, categories, keywords</p>
            <p className='subtext'>Press enter after every tag! Double click to remove</p>
            <div id='tags-container'>
              {tags.map((tag) => (
                <button 
                  key={tag} 
                  type="button"
                  className='tag' 
                  onDoubleClick={() => handleRemoveTag(tag)}
                >
                  #{tag}
                </button>
              ))}
              <div onSubmit={handleAddTag}>
                <input 
                  type='text' 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(e);
                    }
                  }}
                  placeholder='Add tag' 
                />
              </div>
            </div>
          </div>

          <button type="submit" className='add-btn'>add</button>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;