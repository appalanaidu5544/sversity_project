import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const BreadcrumbNav = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      <Link to="/" className="hover:text-primary transition-colors flex items-center">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link to={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;