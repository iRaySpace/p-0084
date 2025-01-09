import { Home, FolderClosed, Users2, Clock, Star, AlertOctagon, Trash2, Cloud, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: FolderClosed, label: "My Drive", path: "/my-drive" },
  { icon: FolderClosed, label: "Computers", path: "/computers" },
  { icon: Users2, label: "Shared with me", path: "/shared" },
  { icon: Clock, label: "Recent", path: "/recent" },
  { icon: Star, label: "Starred", path: "/starred" },
  { icon: AlertOctagon, label: "Spam", path: "/spam" },
  { icon: Trash2, label: "Trash", path: "/trash" },
  { icon: Cloud, label: "Storage", path: "/storage" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background border-r">
      <div className="flex flex-col h-full p-3">
        <div className="mb-6">
          <Button className="w-full justify-start gap-2" variant="outline">
            <Plus className="h-4 w-4" />
            New
          </Button>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                      "hover:bg-accent",
                      isActive ? "bg-accent" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <p>2.8 GB of 15 GB used</p>
            <div className="w-full h-1 bg-muted mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '18.67%' }} />
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            Get more storage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;