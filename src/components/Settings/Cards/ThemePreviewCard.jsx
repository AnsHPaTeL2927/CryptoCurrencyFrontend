/* eslint-disable react/prop-types */
export const ThemePreviewCard = ({ theme, onThemeChange }) => {
    return (
        <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
                <h3 className="card-title text-lg">Theme Preview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full h-32 bg-base-200 rounded-lg flex items-center justify-center">
                            Light Theme
                        </div>
                        <button
                            className={`btn btn-sm ${theme === "light" ? "btn-primary" : "btn-outline"
                                }`}
                            onClick={() => onThemeChange("light")}
                        >
                            Select
                        </button>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-full h-32 bg-neutral rounded-lg flex items-center justify-center text-neutral-content">
                            Dark Theme
                        </div>
                        <button
                            className={`btn btn-sm ${theme === "dark" ? "btn-primary" : "btn-outline"
                                }`}
                            onClick={() => onThemeChange("dark")}
                        >
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
