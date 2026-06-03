import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

const AdminFeesPage = () => {
  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterQuery = filter === 'all' ? '' : `status = "${filter}"`;
        const feeRecords = await pb.collection('fees').getFullList({
          filter: filterQuery,
          sort: '-created',
          $autoCancel: false,
        });
        setFees(feeRecords);

        const studentRecords = await pb.collection('students').getFullList({ $autoCancel: false });
        setStudents(studentRecords);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

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

  const totalRevenue = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter(f => f.status === 'Pending' || f.status === 'Overdue').reduce((sum, f) => sum + f.amount, 0);

  return (
    <>
      <Helmet>
        <title>Manage fees - Sversity</title>
        <meta name="description" content="Track and manage student fee payments and revenue." />
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Manage fees</h1>
                  <p className="text-muted-foreground">Track payments and manage student fees</p>
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All payments</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total revenue</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">Collected payments</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Pending amount</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">Outstanding balance</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{students.length}</div>
                    <p className="text-xs text-muted-foreground mt-1">Enrolled students</p>
                  </CardContent>
                </Card>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
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
                    <h3 className="text-lg font-medium mb-2">No fee records found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your filter</p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Fee records</CardTitle>
                    <CardDescription>All student fee payments and their status</CardDescription>
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
                            <p className="text-xl font-bold">${fee.amount.toLocaleString()}</p>
                            {fee.payment_date && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Paid on {new Date(fee.payment_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
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

export default AdminFeesPage;