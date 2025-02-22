/* eslint-disable react/prop-types */
export const TradingForm = ({ trading, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="form-control">
                    <label className="label">Default Layout</label>
                    <select
                        className="select select-bordered w-full"
                        value={trading.defaultLayout}
                        onChange={(e) =>
                            onChange({ ...trading, defaultLayout: e.target.value })
                        }
                    >
                        <option value="basic">Basic</option>
                        <option value="advanced">Advanced</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">Trading Mode</label>
                    <select
                        className="select select-bordered w-full"
                        value={trading.tradingMode}
                        onChange={(e) =>
                            onChange({ ...trading, tradingMode: e.target.value })
                        }
                    >
                        <option value="live">Live Trading</option>
                        <option value="paper">Paper Trading</option>
                        <option value="demo">Demo Mode</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="form-control flex-1">
                    <label className="label">Default Leverage</label>
                    <select
                        className="select select-bordered w-full"
                        value={trading.defaultLeverage}
                        onChange={(e) =>
                            onChange({ ...trading, defaultLeverage: e.target.value })
                        }
                    >
                        <option value="1">1x</option>
                        <option value="5">5x</option>
                        <option value="10">10x</option>
                        <option value="20">20x</option>
                    </select>
                </div>
                <div className="form-control flex-1">
                    <label className="label">Order Confirmation</label>
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={trading.orderConfirmation}
                        onChange={(e) =>
                            onChange({ ...trading, orderConfirmation: e.target.checked })
                        }
                    />
                </div>
            </div>

            <div className="card bg-base-200">
                <div className="card-body">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h3 className="font-semibold">Risk Warnings</h3>
                            <p className="text-sm opacity-70">Show risk level warnings</p>
                        </div>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={trading.riskWarnings}
                            onChange={(e) =>
                                onChange({ ...trading, riskWarnings: e.target.checked })
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
