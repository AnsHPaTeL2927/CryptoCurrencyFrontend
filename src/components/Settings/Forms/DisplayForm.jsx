/* eslint-disable react/prop-types */
export const DisplayForm = ({ display, onChange }) => {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
                <div className="form-control">
                    <label className="label">Theme</label>
                    <select
                        className="select select-bordered w-full"
                        value={display.theme}
                        onChange={(e) => onChange({ ...display, theme: e.target.value })}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">Default Chart Type</label>
                    <select
                        className="select select-bordered w-full"
                        value={display.chartType}
                        onChange={(e) => onChange({ ...display, chartType: e.target.value })}
                    >
                        <option value="candlestick">Candlestick</option>
                        <option value="line">Line</option>
                        <option value="bar">Bar</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">Language</label>
                    <select
                        className="select select-bordered w-full"
                        value={display.language}
                        onChange={(e) => onChange({ ...display, language: e.target.value })}
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">Timezone</label>
                    <select
                        className="select select-bordered w-full"
                        value={display.timezone}
                        onChange={(e) => onChange({ ...display, timezone: e.target.value })}
                    >
                        <option value="UTC">UTC</option>
                        <option value="EST">EST</option>
                        <option value="PST">PST</option>
                        <option value="GMT">GMT</option>
                    </select>
                </div>
            </div>
        </div>
    );
};