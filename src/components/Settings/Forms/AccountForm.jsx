/* eslint-disable react/prop-types */
export const AccountForm = ({ profile, onChange, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(profile);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={profile.avatar} alt="Profile" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button type="button" className="btn btn-primary flex-1 sm:flex-none">
                        Change Photo
                    </button>
                    <button type="button" className="btn btn-outline flex-1 sm:flex-none">
                        Remove
                    </button>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div className="form-control">
                    <label className="label">Display Name</label>
                    <input
                        type="text"
                        className="input input-bordered"
                        value={profile.displayName}
                        onChange={(e) =>
                            onChange({ ...profile, displayName: e.target.value })
                        }
                    />
                </div>

                <div className="form-control">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        className="input input-bordered"
                        value={profile.email}
                        onChange={(e) => onChange({ ...profile, email: e.target.value })}
                    />
                </div>

                <div className="form-control sm:col-span-2">
                    <label className="label">Phone Number</label>
                    <input
                        type="tel"
                        className="input input-bordered"
                        value={profile.phone}
                        onChange={(e) => onChange({ ...profile, phone: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button type="submit" className="btn btn-primary flex-1 sm:flex-none">
                    Save Changes
                </button>
                <button type="button" className="btn btn-outline flex-1 sm:flex-none">
                    Cancel
                </button>
            </div>
        </form>
    );
};
