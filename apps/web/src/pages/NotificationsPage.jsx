import React, { useEffect, useState, } from 'react';
import { Helmet } from 'react-helmet';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import pb from '@/lib/pocketbaseClient';
import { useAuth } from '@/contexts/AuthContext';

import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const NotificationsPage = () => {
    const { currentUser } = useAuth();
    const [notifications,
        setNotifications] =
        useState([]);
    // FETCH
    useEffect(() => {
        const fetchNotifications =
            async () => {
                try {
                    const records =
                        await pb
                            .collection('notifications')
                            .getFullList({
                                sort: '-created',
                            });
                    console.log(
                            records
                    );

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

                    setNotifications(filtered);
                } catch (error) {
                    console.error(error);
                }
            };
        if (currentUser?.id) {
            fetchNotifications();
        }
    }, [currentUser]);
    // DELETE
    const deleteNotification =
        async (id) => {
            try {
                await pb
                    .collection(
                        'notifications'
                    )
                    .delete(id);

                setNotifications((prev) =>
                    prev.filter(
                        (n) => n.id !== id
                    )
                );
                toast.success(
                    'Notification deleted'
                );
            } catch (error) {
                console.error(error);
                toast.error(
                    'Delete failed'
                );
            }
        };

    return (
        <>
            <Helmet>
                <title>
                    Notifications - Sversity
                </title>
            </Helmet>
            <div className="min-h-screen flex flex-col bg-slate-50">
                <Logout />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar />
                    <main
                        className="
              flex-1
              lg:ml-64
              p-6 lg:p-8
              overflow-y-auto
              h-[calc(100vh-73px)]
            "
                    >
                        <div className="max-w-5xl mx-auto space-y-6">
                            {/* HEADER */}
                            <div>
                                <h1 className="text-3xl font-bold">
                                    Notifications
                                </h1>
                                <p className="text-muted-foreground mt-2">
                                    View all your latest updates
                                </p>
                            </div>
                            {/* LIST */}
                            <div className="space-y-4">
                                {notifications.length === 0 ? (
                                    <Card>
                                        <CardContent className="p-10 text-center text-muted-foreground">
                                            No notifications found
                                        </CardContent>
                                    </Card>
                                ) : (
                                    notifications.map(
                                        (notification) => (
                                            <Card
                                                key={notification.id}
                                                className={`
                          border-0 shadow-md rounded-2xl
                          ${!notification.read ? 'bg-blue-50' : ''}
                          `}
                                            >
                                                <CardContent className="p-5">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h2 className="font-semibold text-lg">
                                                                {notification.title}
                                                            </h2>
                                                            <p className="text-muted-foreground mt-1">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-xs text-slate-400 mt-3">
                                                                {new Date(
                                                                    notification.created
                                                                ).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() =>
                                                                deleteNotification(
                                                                    notification.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="w-5 h-5 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default NotificationsPage;