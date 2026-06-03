import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const FeesPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const records = await pb.collection('fees').getFullList({
          filter: `student_id = "${currentUser.id}"`,
          sort: '-created',
          $autoCancel: false,
        });
        setFees(records);
      } catch (error) {
        console.error('Error fetching fees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, [currentUser.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'Overdue':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
    }
  };

  const handlePayment = () => {
    toast('Payment integration coming soon', {
      description: 'Stripe payment gateway will be integrated in the next update',
    });
  };

  const totalPending = fees
    .filter(f => f.status === 'Pending' || f.status === 'Overdue')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalPaid = fees
    .filter(f => f.status === 'Paid')
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <>
      <Helmet>
        <title>Fee payments - Sversity</title>
        <meta name="description" content="View and manage your fee payments and payment history." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Logout />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1
              lg:ml-64
              p-6 lg:p-8
              overflow-y-auto
              h-[calc(100vh-73px)]">
            <div className="max-w-7xl mx-auto space-y-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Fee payments</h1>
                <p className="text-muted-foreground">Manage your tuition and fee payments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total pending</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">Outstanding balance</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total paid</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">Payments completed</p>
                  </CardContent>
                </Card>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : fees.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No fee records</h3>
                    <p className="text-sm text-muted-foreground">Your fee information will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment history</CardTitle>
                    <CardDescription>View all your fee records and payment status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {fees.map((fee) => (
                        <div key={fee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={getStatusColor(fee.status)}>
                                {fee.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                Due: {new Date(fee.due_date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-2xl font-bold">${fee.amount.toLocaleString()}</p>
                            {fee.payment_date && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Paid on {new Date(fee.payment_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {(fee.status === 'Pending' || fee.status === 'Overdue') && (
                            <Button onClick={handlePayment}>
                              Pay now
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default FeesPage;