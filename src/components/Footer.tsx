import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-heading text-xl font-bold text-primary">Chetna</span>
              <span className="font-heading text-xl font-bold">Academy</span>
            </Link>
            <p className="text-muted-foreground">
              Soon empowering youth across India with practical skills through affordable, hands-on training and mentorship.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Planned Courses</Link></li>
              <li><Link to="/workshops" className="text-muted-foreground hover:text-primary transition-colors">Future Workshops</Link></li>
              <li><Link to="/join-trainer" className="text-muted-foreground hover:text-primary transition-colors">Join as Trainer</Link></li>
              <li><Link to="/success-stories" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3 - Courses */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Upcoming Courses</h3>
            <ul className="space-y-2">
              <li><Link to="/courses/tech" className="text-muted-foreground hover:text-primary transition-colors">Web Development</Link></li>
              <li><Link to="/courses/tech" className="text-muted-foreground hover:text-primary transition-colors">Digital Marketing</Link></li>
              <li><Link to="/courses/tech" className="text-muted-foreground hover:text-primary transition-colors">Graphic Design</Link></li>
              <li><Link to="/courses/soft" className="text-muted-foreground hover:text-primary transition-colors">Communication Skills</Link></li>
              <li><Link to="/courses/foundational" className="text-muted-foreground hover:text-primary transition-colors">Basic Computer Skills</Link></li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 text-primary" />
                <span className="text-muted-foreground">Kokrajhar, Assam, India (Coming Soon)</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a href="mailto:info@chetnaacademy.com" className="text-muted-foreground hover:text-primary transition-colors">info@chetnaacademy.com</a>
              </li>
              <li className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                <a href="https://wa.me/919876543210" className="text-muted-foreground hover:text-primary transition-colors">WhatsApp Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Chetna Academy (Coming Soon). All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <div className="flex items-center space-x-2">
                <span>Language:</span>
                <select className="bg-transparent text-muted-foreground border-none outline-none cursor-pointer">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="as">Assamese</option>
                  <option value="bo">Bodo</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
