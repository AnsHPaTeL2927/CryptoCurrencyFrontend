/* eslint-disable react/prop-types */
import {
    Bell,
    Lock,
    User,
    Settings as SettingsIcon,
    Code,
    MonitorSmartphone,
    Menu,
    X
} from "lucide-react";

const navItems = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "trading", label: "Trading", icon: SettingsIcon },
    { id: "api", label: "API Keys", icon: Code },
    { id: "display", label: "Display", icon: MonitorSmartphone },
];

const Sidebar = ({ activeTab, onTabChange, showMobileNav, setShowMobileNav }) => {
    const NavContent = () => (
        <ul className="menu bg-base-100 w-full">
            {navItems.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                    <button
                        className={activeTab === id ? "active" : ""}
                        onClick={() => {
                            onTabChange(id);
                            setShowMobileNav(false);
                        }}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </button>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {/* Mobile Navigation */}
            <div className="lg:hidden">
                <div className="navbar bg-base-100 sticky top-0 z-50 shadow-lg">
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">Settings</h1>
                    </div>
                    <div className="flex-none">
                        <button
                            className="btn btn-square btn-ghost"
                            onClick={() => setShowMobileNav(!showMobileNav)}
                        >
                            {showMobileNav ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileNav && (
                    <div className="fixed inset-0 z-40 bg-base-100">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">Settings Menu</h2>
                                <button
                                    className="btn btn-square btn-ghost"
                                    onClick={() => setShowMobileNav(false)}
                                >
                                    <X />
                                </button>
                            </div>
                            <NavContent />
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
                <div className="card bg-base-100 shadow-xl h-fit">
                    <div className="card-body p-2">
                        <NavContent />
                    </div>
                </div>
            </div>
        </>
    );
};

export { navItems };
export default Sidebar;