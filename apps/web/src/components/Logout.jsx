import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';
import NotificationBell from './NotificationBell';

const Logout = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      'Are you sure you want to logout?'
    );

    if (confirmLogout) {
      logout();

      toast.success('Logged out successfully');

      navigate('/');
    }
  };

  // First Letter Avatar
  const firstLetter =
    currentUser?.name?.charAt(0)?.toUpperCase() || 'U';

  // Profile Image
  const profileImage =
    currentUser?.avatar
      ? pb.files.getURL(currentUser, currentUser.avatar)
      : null;

  return (
    <div className="glass-panel w-full border-b bg-background sticky top-0 z-50 shadow-sm overflow-visible">
      <div className="flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to={
            currentUser?.role === 'admin'
              ? '/admin-dashboard'
              : currentUser?.role === 'student'
                ? '/student-dashboard'
                : '/'
          }
          className="flex items-center gap-3 group"
        >
          <img
            src="https://horizons-cdn.hostinger.com/ab98a221-4cef-403f-a384-84eb26761e2f/8b4b3c8fead9e08be0fc931b2025bd4c.png"
            alt="Sversity Logo"
            className="h-8 w-auto group-hover:scale-105 transition-transform"
          />

          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-[#4F46E5] leading-none">
              Sversity
            </span>

            <span className="text-[10px] text-[#06B6D4] font-semibold tracking-wider uppercase mt-0.5">
              Secure. Smart. Scalable.
            </span>
          </div>
        </Link>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>

          <div className="flex items-center gap-4 relative">
            <NotificationBell />
            <div className="relative"></div>

            {/* Profile Circle */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="
              w-11 h-11 rounded-full
              bg-primary text-white
              flex items-center justify-center
              font-bold text-lg
              overflow-hidden
              border-2 border-primary/20
              hover:scale-105
              transition-all duration-300
              shadow-md
            "
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                firstLetter
              )}
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div
                className="
                absolute right-2 top-14
                w-64
                bg-white dark:bg-zinc-900
                border border-slate-200
                rounded-2xl
                shadow-2xl
                py-2
                z-[999]
                animate-in fade-in zoom-in-95
              "
              >

                {/* User Info */}
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-sm">
                    {currentUser?.name || 'User'}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {currentUser?.email}
                  </p>
                </div>

                <Link
                  to="/profile"
                  className="
                    w-full flex items-center gap-2
                    px-4 py-3 text-sm
                    hover:bg-slate-100
                    transition-colors 
                  "
                >
                  Profile Settings
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="
                  w-full flex items-center gap-2
                  px-4 py-3 text-sm
                  hover:bg-red-50
                  hover:text-red-600
                  transition-colors
                "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;