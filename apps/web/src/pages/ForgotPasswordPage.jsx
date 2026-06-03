import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ForgotPasswordPage = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] =
        useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await forgotPassword(email);
            toast.success(
                'Password reset email sent.'
            );
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
                    Forgot Password
                </title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>
                            Forgot Password
                        </CardTitle>

                        <CardDescription>
                            Enter your email to reset password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <Input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading
                                    ? 'Sending...'
                                    : 'Send Reset Link'}

                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ForgotPasswordPage;