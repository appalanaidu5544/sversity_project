import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

import {
  Home,
  FileText,
  BookOpen,
  DollarSign,
  LayoutDashboard,
  Bell,
} from 'lucide-react';

const Sidebar = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  const studentLinks = [
    { to: '/student-dashboard', label: 'Home', icon: Home },
    { to: '/admissions', label: 'Admissions', icon: FileText },
    { to: '/academics', label: 'Academics', icon: BookOpen },
    { to: '/fees', label: 'Fee payments', icon: DollarSign },
    { to: '/profile', label: 'Profile Settings', icon: User },
    { to: '/notifications', label: 'Notifications', icon: Bell }
  ];

  const facultyLinks = [
    { to: '/faculty-dashboard', label: 'Home', icon: Home },
    { to: '/academics', label: 'Academics', icon: BookOpen },
    { to: '/profile', label: 'Profile Settings', icon: User },
    { to: '/notifications', label: 'Notifications', icon: Bell }
  ];

  const adminLinks = [
    { to: '/admin-dashboard', label: 'Home', icon: Home },
    { to: '/AdminAdmissionsPage', label: 'Admissions', icon: FileText },
    { to: '/AdminCoursesPage', label: 'Academics', icon: BookOpen },
    { to: '/AdminFeesPage', label: 'Fee payments', icon: DollarSign },
    //{ to: '/admin-dashboard', label: 'Admin dashboard', icon: LayoutDashboard },
    { to: '/profile', label: 'Profile Settings', icon: User },
    { to: '/notifications', label: 'Notifications', icon: Bell },
  ];

  const getLinks = () => {
    if (currentUser?.role === 'student') return studentLinks;
    if (currentUser?.role === 'faculty') return facultyLinks;
    if (currentUser?.role === 'admin') return adminLinks;
    return [];
  };

  const links = getLinks();

  return (
    <aside className="hidden lg:flex
      fixed left-0 top-[73px]
      h-[calc(100vh-73px)]
      w-64
      flex-col
      border-r
      bg-background
      z-40">
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;