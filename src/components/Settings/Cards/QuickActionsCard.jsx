export const QuickActionsCard = () => {
    return (
        <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
                <h3 className="card-title text-lg">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <button className="btn btn-outline btn-info">Export Data</button>
                    <button className="btn btn-outline btn-error">Delete Account</button>
                </div>
            </div>
        </div>
    );
};