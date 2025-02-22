export const SecurityTipsCard = () => {
    return (
        <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
                <h3 className="card-title text-lg">Security Tips</h3>
                <ul className="list-disc list-inside space-y-2 mt-4 text-sm opacity-70">
                    <li>Use a strong, unique password</li>
                    <li>Enable two-factor authentication for extra security</li>
                    <li>Never share your login credentials</li>
                    <li>Regularly check your account activity</li>
                </ul>
            </div>
        </div>
    );
};