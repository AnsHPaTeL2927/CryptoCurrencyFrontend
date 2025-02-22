import {
    Bell,
    Lock,
    User,
    Settings,
    Code,
    MonitorSmartphone,
    Menu,
    X
} from "lucide-react";

const navItems = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "trading", label: "Trading", icon: Settings },
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
            <div className="lg:hidden relative">
                <div className="navbar bg-base-100 shadow-lg z-40 relative">
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

                {/* Backdrop with blur effect */}
                {showMobileNav && (
                    <>
                        <div 
                            className="fixed inset-0 bg-base-300/30 backdrop-blur-sm z-20"
                            onClick={() => setShowMobileNav(false)}
                        />
                        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-lg z-30">
                            <div className="p-4">
                                <NavContent />
                            </div>
                        </div>
                    </>
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