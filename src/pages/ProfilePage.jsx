import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';

import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { toast } from 'sonner';

const ProfilePage = () => {
    const { currentUser } = useAuth();

    const [loading, setLoading] = useState(false);

    // Profile Form
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
    });

    // Avatar
    const [avatar, setAvatar] = useState(null);

    // Password Form
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        password: '',
        passwordConfirm: '',
    });

    // Profile Image
    const profileImage = currentUser?.avatar
        ? pb.files.getURL(currentUser, currentUser.avatar)
        : null;

    // Update Profile
    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const updateData = {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
            };

            // Avatar Upload
            if (avatar) {
                updateData.avatar = avatar;
            }

            await pb
                .collection('users')
                .update(currentUser.id, updateData);

            toast.success('Profile updated successfully');

            window.location.reload();
        } catch (error) {
            console.error(error);

            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    // Update Password
    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // Password Match Validation
        if (
            passwordData.password !==
            passwordData.passwordConfirm
        ) {
            toast.error('Passwords do not match');

            return;
        }

        setLoading(true);

        try {
            await pb.collection('users').update(
                currentUser.id,
                {
                    oldPassword: passwordData.oldPassword,
                    password: passwordData.password,
                    passwordConfirm:
                        passwordData.passwordConfirm,
                }
            );

            toast.success(
                'Password updated successfully'
            );

            // Reset Password Fields
            setPasswordData({
                oldPassword: '',
                password: '',
                passwordConfirm: '',
            });
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.message ||
                'Failed to update password'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Profile Settings - Sversity
                </title>
            </Helmet>

            <div className="min-h-screen flex flex-col bg-slate-50">
                {/* Top Navbar */}
                <Logout />

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Content */}
                    <main
                        className="
              flex-1
              lg:ml-64
              p-6
              lg:p-8
              overflow-y-auto
              h-[calc(100vh-73px)]
            "
                    >
                        <div className="max-w-5xl mx-auto space-y-8">
                            {/* Page Header */}
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">
                                    Profile Settings
                                </h1>

                                <p className="text-slate-500 mt-2">
                                    Manage your account information and
                                    security
                                </p>
                            </div>

                            {/* Profile Information Card */}
                            <Card className="rounded-3xl shadow-lg border-0">
                                <CardHeader>
                                    <CardTitle>
                                        Profile Information
                                    </CardTitle>

                                    <CardDescription>
                                        Update your personal details
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form
                                        onSubmit={handleProfileUpdate}
                                        className="space-y-6"
                                    >
                                        {/* Avatar Section */}
                                        <div className="flex items-center gap-6">
                                            {/* Avatar */}
                                            <div
                                                className="
                          w-24 h-24 rounded-full
                          overflow-hidden
                          bg-primary
                          flex items-center justify-center
                          text-white text-3xl font-bold
                          shadow-lg
                        "
                                            >
                                                {profileImage ? (
                                                    <img
                                                        src={profileImage}
                                                        alt="Profile"
                                                        className="
                              w-full h-full
                              object-cover
                            "
                                                    />
                                                ) : (
                                                    currentUser?.name
                                                        ?.charAt(0)
                                                        ?.toUpperCase()
                                                )}
                                            </div>

                                            {/* Upload Avatar */}
                                            <div className="space-y-2">
                                                <Label>
                                                    Upload Avatar
                                                </Label>

                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        setAvatar(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* Full Name */}
                                        <div className="space-y-2">
                                            <Label>
                                                Full Name
                                            </Label>

                                            <Input
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label>
                                                Email Address
                                            </Label>

                                            <Input
                                                value={currentUser?.email}
                                                disabled
                                            />
                                        </div>

                                        {/* Role */}
                                        <div className="space-y-2">
                                            <Label>
                                                Role
                                            </Label>

                                            <Input
                                                value={currentUser?.role}
                                                disabled
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <Label>
                                                Phone Number
                                            </Label>

                                            <Input
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        phone: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Address */}
                                        <div className="space-y-2">
                                            <Label>
                                                Address
                                            </Label>

                                            <Input
                                                value={formData.address}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Save Button */}
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="
                        rounded-xl
                        px-6
                        shadow-md
                      "
                                        >
                                            {loading
                                                ? 'Saving...'
                                                : 'Save Changes'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Change Password Card */}
                            <Card className="rounded-3xl shadow-lg border-0">
                                <CardHeader>
                                    <CardTitle>
                                        Change Password
                                    </CardTitle>

                                    <CardDescription>
                                        Update your account password
                                        securely
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form
                                        onSubmit={handlePasswordChange}
                                        className="space-y-4"
                                    >
                                        {/* Current Password */}
                                        <div className="space-y-2">
                                            <Label>
                                                Current Password
                                            </Label>

                                            <Input
                                                type="password"
                                                value={
                                                    passwordData.oldPassword
                                                }
                                                onChange={(e) =>
                                                    setPasswordData({
                                                        ...passwordData,
                                                        oldPassword:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* New Password */}
                                        <div className="space-y-2">
                                            <Label>
                                                New Password
                                            </Label>

                                            <Input
                                                type="password"
                                                value={
                                                    passwordData.password
                                                }
                                                onChange={(e) =>
                                                    setPasswordData({
                                                        ...passwordData,
                                                        password:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="space-y-2">
                                            <Label>
                                                Confirm Password
                                            </Label>

                                            <Input
                                                type="password"
                                                value={
                                                    passwordData.passwordConfirm
                                                }
                                                onChange={(e) =>
                                                    setPasswordData({
                                                        ...passwordData,
                                                        passwordConfirm:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Update Password Button */}
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="
                        rounded-xl
                        px-6
                        shadow-md
                      "
                                        >
                                            {loading
                                                ? 'Updating...'
                                                : 'Update Password'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;