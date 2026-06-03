import React, { useEffect, useState } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await pb
                    .collection('users')
                    .confirmVerification(token);
                setVerified(true);

                toast.success(
                    'Email verified successfully'
                );
            } catch (error) {
                console.error(error);
                toast.error(
                    'Verification failed'
                );

            } finally {
                setLoading(false);
            }
        };

        if (token) {
            verifyEmail();
        }

    }, [token]);

    return (
        <>
            <Helmet>
                <title>
                    Verify Email
                </title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    {loading ? (
                        <>
                            <h1 className="text-3xl font-bold mb-4">
                                Verifying Email...
                            </h1>
                            <p className="text-muted-foreground">
                                Please wait while we verify your account.
                            </p>
                        </>
                    ) : verified ? (
                        <>
                            <h1 className="text-3xl font-bold mb-4 text-green-600">
                                Email Verified
                            </h1>
                            <p className="text-muted-foreground mb-6">
                                Your account has been verified successfully.
                            </p>
                            <Button
                                onClick={() =>
                                    navigate('/login')
                                }
                            >
                                Go to Login
                            </Button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl font-bold mb-4 text-red-500">
                                Verification Failed
                            </h1>
                            <p className="text-muted-foreground">
                                Invalid or expired verification link.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default VerifyEmailPage;