import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';

const NotificationBell = () => {
  const { currentUser } = useAuth();
  const [notifications,
    setNotifications] =
    useState([]);

  const [showDropdown,
    setShowDropdown] =
    useState(false);

  // FETCH NOTIFICATIONS
  useEffect(() => {
    const fetchNotifications =
      async () => {
        try {
          // DEBUG
          //console.log('Current User ID:',currentUser?.id);
          const records =
            await pb
              .collection(
                'notifications'
              )
              .getFullList({
                sort: '-created',
              });

          //console.log('All Notifications:',records);

          // FILTER MANUALLY
          const filtered = records.filter(
            (notification) => {

              // RELATION FIELD ARRAY SUPPORT
              if (Array.isArray(notification.user_id)) {
                return notification.user_id.includes(
                  currentUser?.id
                );
              }

              return (
                notification.user_id ===
                currentUser?.id
              );
            }
          );

          //console.log('Filtered Notifications:',filtered);
          setNotifications(filtered);
        } catch (error) {
          console.error(
            'Notification Fetch Error:',
            error
          );
        }
      };

    if (currentUser?.id) {
      fetchNotifications();
    }

  }, [currentUser]);

  // UNREAD COUNT
  const unreadCount =
    notifications.filter(
      (n) => !n.read
    ).length;

  // MARK AS READ
  const markAsRead =
    async (id) => {
      try {
        await pb
          .collection(
            'notifications'
          )
          .update(id, {
            read: true,
          });

        setNotifications((prev) =>
          prev.map((n) =>
            n.id === id
              ? {
                ...n,
                read: true,
              }
              : n
          )
        );

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="relative">
      {/* BELL BUTTON */}
      <button
        onClick={() =>
          setShowDropdown(
            !showDropdown
          )
        }
        className="
          relative
          p-2 rounded-full
          hover:bg-slate-100
          transition-colors
        "
      >

        <Bell className="w-6 h-6 text-slate-700" />
        {/* BADGE */}
        {unreadCount > 0 && (
          <span
            className="
              absolute -top-1 -right-1
              bg-red-500 text-white
              text-[10px]
              rounded-full
              min-w-[18px]
              h-[18px]
              flex items-center justify-center
              px-1
            "
          >
            {unreadCount}
          </span>
        )}
      </button>
      {/* DROPDOWN */}
      {showDropdown && (
        <div
          className="
            absolute right-0 top-14
            w-96
            bg-white
            rounded-2xl
            shadow-2xl
            border
            z-[999]
            overflow-hidden
          "
        >
          {/* HEADER */}
          <div
            className="
              px-5 py-4
              border-b
              flex items-center justify-between
            "
          >
            <h2 className="font-bold text-lg">
              Notifications
            </h2>
            <Link
              to="/notifications"
              className="
                text-sm text-primary
                hover:underline
              "
            >
              View All
            </Link>
          </div>
          {/* BODY */}
          <div
            className="
              max-h-[400px]
              overflow-y-auto
            "
          >
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No notifications yet
              </div>
            ) : (
              notifications.map(
                (notification) => (
                  <div
                    key={notification.id}
                    className={`
                      p-4 border-b
                      hover:bg-slate-50
                      transition-colors
                      ${!notification.read
                        ? 'bg-blue-50'
                        : ''
                      }
                    `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-sm">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {
                            notification.message
                          }
                        </p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() =>
                            markAsRead(
                              notification.id
                            )
                          }
                        >
                          <CheckCircle
                            className="
                              w-5 h-5
                              text-primary
                            "
                          />
                        </button>
                      )}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;