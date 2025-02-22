export const TradingLimitsCard = () => {
    return (
        <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
                <h3 className="card-title text-lg">Trading Limits</h3>
                <div className="mt-4 space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Daily Trading Limit</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Maximum Position Size</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            className="input input-bordered"
                        />
                    </div>
                    <button className="btn btn-primary w-full sm:w-auto">
                        Update Limits
                    </button>
                </div>
            </div>
        </div>
    );
};