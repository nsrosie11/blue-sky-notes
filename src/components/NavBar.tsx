
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, User, NotepadText, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavBarProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogout?: () => void;
}

const NavBar = ({ isLoggedIn = false, username = "", onLogout }: NavBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <NotepadText className="h-6 w-6 text-primary" />
              <span className="font-semibold text-xl text-primary">Daily Notes</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-secondary flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/notes" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-secondary flex items-center gap-2">
                  <NotepadText className="h-4 w-4" />
                  <span>Notes</span>
                </Link>
                <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-secondary flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <div className="ml-3 relative">
                  <Button variant="outline" onClick={onLogout}>Logout</Button>
                </div>
              </>
            ) : (
              <div className="flex space-x-3">
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-secondary"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden",
        isMobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-secondary">
            Home
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/notes" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-secondary">
                Notes
              </Link>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-secondary">
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <Button variant="outline" asChild className="w-full">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
