import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Plus } from 'lucide-react';

const AdmissionsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    // Prevent loading before user exists
    if (!currentUser?.id) return;

    const fetchApplications = async () => {
      try {

        setLoading(true);

        // FETCH RECORDS
        const records = await pb
          .collection('admissions')
          .getFullList({
            //filter: `student_id = "${currentUser.id}"`,
            sort: '-created',
            $autoCancel: false,
          });

        // DEBUG
        console.log('Admissions Records:', records);

        // UPDATE STATE
        setApplications(records);
        console.log(records);

      } catch (error) {

        console.error('Error fetching applications:', error);

      } finally {

        setLoading(false);

      }
    };

    fetchApplications();

  }, [currentUser]);

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
        <title>Admissions - Sversity</title>
        <meta name="description" content="View your admission applications and their status." />
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
                  <h1 className="text-3xl font-bold mb-2">Admissions</h1>
                  <p className="text-muted-foreground">Track your application status and history</p>
                </div>
                <Button asChild>
                  <Link to="/admissions/apply">
                    <Plus className="mr-2 h-4 w-4" />
                    New application
                  </Link>
                </Button>
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
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                    <p className="text-sm text-muted-foreground mb-4">Start your journey by submitting an application</p>
                    <Button asChild>
                      <Link to="/admissions/apply">Submit application</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card key={app.id} className="hover:shadow-md transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-xl">{app.program}</CardTitle>
                            <CardDescription className="mt-1">
                              Applied on {new Date(app.created).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Full name:</span>
                            <p className="font-medium">{app.full_name}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Email:</span>
                            <p className="font-medium">{app.email}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Phone:</span>
                            <p className="font-medium">{app.phone}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">GPA:</span>
                            <p className="font-medium">{app.gpa}</p>
                          </div>
                        </div>
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

export default AdmissionsPage;