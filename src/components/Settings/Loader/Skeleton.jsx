import { Bell, Lock, User, Settings, Code, MonitorSmartphone } from "lucide-react";

const SkeletonSidebar = () => {
  const navItems = [
    { id: "account", icon: User },
    { id: "security", icon: Lock },
    { id: "notifications", icon: Bell },
    { id: "trading", icon: Settings },
    { id: "api", icon: Code },
    { id: "display", icon: MonitorSmartphone },
  ];

  return (
    <div className="card bg-base-100 shadow-xl h-fit">
      <div className="card-body p-2">
        <ul className="menu w-full">
          {navItems.map(({ id, icon: Icon }) => (
            <li key={id}>
              <button className="animate-pulse bg-base-200">
                <Icon className="w-4 h-4 opacity-50" />
                <div className="h-4 w-24 bg-base-300 rounded"></div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AccountFormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-24 h-24 rounded-full bg-base-300"></div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <div className="h-10 w-32 bg-base-300 rounded"></div>
        <div className="h-10 w-32 bg-base-300 rounded"></div>
      </div>
    </div>

    <div className="grid gap-6 sm:grid-cols-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="form-control">
          <div className="h-4 w-24 bg-base-300 rounded mb-2"></div>
          <div className="h-12 bg-base-300 rounded"></div>
        </div>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
      <div className="h-12 w-32 bg-base-300 rounded"></div>
      <div className="h-12 w-32 bg-base-300 rounded"></div>
    </div>
  </div>
);

const CardSkeleton = () => (
  <div className="card bg-base-100 shadow-xl mt-6 animate-pulse">
    <div className="card-body">
      <div className="h-6 w-48 bg-base-300 rounded mb-4"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-full bg-base-300 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

const Skeleton = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="lg:hidden">
              <div className="navbar bg-base-100 sticky top-0 z-50 shadow-lg">
                <div className="flex-1">
                  <div className="h-6 w-32 bg-base-300 rounded animate-pulse"></div>
                </div>
                <div className="flex-none">
                  <div className="h-10 w-10 bg-base-300 rounded"></div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <SkeletonSidebar />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="h-8 w-48 bg-base-300 rounded mb-6 animate-pulse"></div>
                <AccountFormSkeleton />
                <CardSkeleton />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;