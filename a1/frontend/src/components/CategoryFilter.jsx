import React from 'react';

function CategoryFilter({ categories, selectedCategories, onCategoryChange }) {
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    onCategoryChange(value, checked);
  };

  return (
    <div className="category-filter">
      <h5>Filter by Categories</h5>
      {categories.map((category) => (
        <div key={category} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={category}
            id={`category-${category}`}
            checked={selectedCategories.includes(category)}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label" htmlFor={`category-${category}`}>
            {category}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;