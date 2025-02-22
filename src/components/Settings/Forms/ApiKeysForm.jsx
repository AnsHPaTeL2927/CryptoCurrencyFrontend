export const ApiKeysForm = () => {
    return (
        <div className="space-y-6">
            <div className="alert alert-info">
                <div>
                    <h3 className="font-bold">API Access Coming Soon!</h3>
                    <div className="text-sm">
                        API key management will be available in the next update.
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-full" disabled>
                Generate New API Key
            </button>
        </div>
    );
};