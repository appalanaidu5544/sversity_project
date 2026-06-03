import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';

const AdminCoursesPage = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRecords = await pb.collection('courses').getFullList({
          sort: 'course_code',
          $autoCancel: false,
        });
        setCourses(courseRecords);

        const enrollmentRecords = await pb.collection('enrollments').getFullList({ $autoCancel: false });
        setEnrollments(enrollmentRecords);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getEnrollmentCount = (courseId) => {
    return enrollments.filter(e => e.course_id === courseId).length;
  };

  return (
    <>
      <Helmet>
        <title>Manage courses - Sversity</title>
        <meta name="description" content="Manage courses, assign faculty, and view enrollment statistics." />
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
                <h1 className="text-3xl font-bold mb-2">Manage courses</h1>
                <p className="text-muted-foreground">View and manage course catalog and enrollments</p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : courses.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No courses available</h3>
                    <p className="text-sm text-muted-foreground">Add courses to get started</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => {
                    const enrollmentCount = getEnrollmentCount(course.id);
                    return (
                      <Card key={course.id} className="hover:shadow-lg transition-all duration-200">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline">{course.course_code}</Badge>
                            <Badge className="bg-primary/10 text-primary">
                              {course.credits} credits
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{course.course_name}</CardTitle>
                          <CardDescription>{course.schedule || 'Schedule TBA'}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Enrolled students:</span>
                            <span className="font-medium">{enrollmentCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Instructor:</span>
                            <span className="font-medium">{course.instructor_id || 'Not assigned'}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminCoursesPage;