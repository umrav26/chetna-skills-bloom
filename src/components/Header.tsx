
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleCategoryClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' }, // Removed dropdown, direct link to courses
    { name: 'About Us', path: '/about' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Join as Trainer', path: '/join-trainer' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveDropdown(null);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/lovable-uploads/540b532e-034d-4136-a9b1-f88ed6fe9028.png" alt="Chetna Academy" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                to={link.path}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button asChild variant="outline">
            <Link to="/apply">Join Waitlist</Link>
          </Button>
          <Button asChild>
            <Link to="/courses">Preview Courses</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <div key={link.name} className="py-2">
                <Link
                  to={link.path}
                  className="block"
                  onClick={toggleMenu}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/apply" onClick={toggleMenu}>Join Waitlist</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/courses" onClick={toggleMenu}>Preview Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
