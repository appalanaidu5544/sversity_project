import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResetPasswordPage = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [searchParams] =
        useSearchParams();
    const token =
        searchParams.get('token');
    const [password, setPassword] =
        useState('');
    const [confirmPassword,
        setConfirmPassword] =
        useState('');
    const [loading, setLoading] =
        useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            password !== confirmPassword
        ) {

            toast.error(
                'Passwords do not match'
            );

            return;
        }
        setLoading(true);
        try {
            await resetPassword(
                token,
                password,
                confirmPassword
            );
            toast.success(
                'Password updated successfully'
            );
            navigate('/login');
        } catch (error) {
            toast.error(
                error.message
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>
                    Reset Password
                </title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>
                            Reset Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <Input
                                type="password"
                                placeholder="New password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >

                                {loading
                                    ? 'Updating...'
                                    : 'Reset Password'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ResetPasswordPage;