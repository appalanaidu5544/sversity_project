import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';

const AdminAdmissionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      const filterQuery = filter === 'all' ? '' : `status = "${filter}"`;
      const records = await pb.collection('admissions').getFullList({
        filter: filterQuery,
        sort: '-created',
        $autoCancel: false,
      });
      setApplications(records);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await pb.collection('admissions').update(id, { status }, { $autoCancel: false });
      toast.success(`Application ${status.toLowerCase()}`);
      fetchApplications();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'Rejected':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'Under Review':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
    }
  };

  return (
    <>
      <Helmet>
        <title>Manage admissions - Sversity</title>
        <meta name="description" content="Review and manage student admission applications." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Logout />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8 flex-1
            lg:ml-64
            p-6 lg:p-8
            overflow-y-auto
            h-[calc(100vh-73px)]">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Manage admissions</h1>
                  <p className="text-muted-foreground">Review and process student applications</p>
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All applications</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Under Review">Under review</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : applications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-lg font-medium mb-2">No applications found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your filter</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="hover:shadow-md transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{app.full_name}</CardTitle>
                            <CardDescription className="mt-1">
                              Applied for {app.program} on {new Date(app.created).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">Email:</span>
                            <p className="font-medium">{app.email}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Phone:</span>
                            <p className="font-medium">{app.phone}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Program:</span>
                            <p className="font-medium">{app.program}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">GPA:</span>
                            <p className="font-medium">{app.gpa}</p>
                          </div>
                        </div>

                        {app.status === 'Pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => updateStatus(app.id, 'Under Review')}
                              variant="outline"
                            >
                              Mark under review
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateStatus(app.id, 'Accepted')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateStatus(app.id, 'Rejected')}
                              variant="destructive"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminAdmissionsPage;