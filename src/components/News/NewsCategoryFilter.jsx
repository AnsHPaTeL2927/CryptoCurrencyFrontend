/* eslint-disable react/prop-types */
export const NewsCategoryFilter = ({ 
    categories, 
    selectedCategory, 
    onCategoryChange 
}) => {
    return (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
            {categories.map(category => (
                <button
                    key={category}
                    className={`btn btn-sm ${selectedCategory === category ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
