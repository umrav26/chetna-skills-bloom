
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Courses', 
      path: '/courses',
      dropdown: [
        { name: 'Tech Skills', path: '/courses/tech' },
        { name: 'Soft Skills', path: '/courses/soft' },
        { name: 'Foundational', path: '/courses/foundational' }
      ]
    },
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
          <span className="font-heading text-xl font-bold text-primary">Chetna</span>
          <span className="font-heading text-xl font-bold">Academy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <>
                  <button 
                    className="inline-flex items-center text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => toggleDropdown(link.name)}
                  >
                    {link.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2 hover:bg-muted transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button asChild variant="outline">
            <Link to="/apply">Apply Now</Link>
          </Button>
          <Button asChild>
            <Link to="/courses">Explore Courses</Link>
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
                {link.dropdown ? (
                  <>
                    <button 
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleDropdown(link.name)}
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {activeDropdown === link.name && (
                      <div className="ml-4 mt-2 space-y-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block py-2"
                            onClick={toggleMenu}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="block"
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex flex-col space-y-3 pt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/apply" onClick={toggleMenu}>Apply Now</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/courses" onClick={toggleMenu}>Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
