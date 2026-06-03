import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const record = await pb.collection('courses').getOne(id, { $autoCancel: false });
        setCourse(record);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{`${course?.course_name || 'Course details'} - Sversity`}</title>
        <meta name="description" content="View detailed information about this course." />
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
            <div className="max-w-4xl mx-auto space-y-8">
              <Button variant="ghost" onClick={() => navigate('/academics')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to courses
              </Button>

              {loading ? (
                <Card>
                  <CardHeader>
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ) : course ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge variant="outline" className="mb-2">{course.course_code}</Badge>
                        <CardTitle className="text-3xl">{course.course_name}</CardTitle>
                        <CardDescription className="mt-2">{course.schedule || 'Schedule TBA'}</CardDescription>
                      </div>
                      <Badge className="bg-primary/10 text-primary text-lg px-4 py-2">
                        {course.credits} credits
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Course syllabus</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {course.syllabus || 'Syllabus information will be available soon.'}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Schedule</h3>
                      <p className="text-muted-foreground">
                        {course.schedule || 'Schedule will be announced by the instructor.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-lg font-medium mb-2">Course not found</h3>
                    <p className="text-sm text-muted-foreground mb-4">The course you're looking for doesn't exist</p>
                    <Button onClick={() => navigate('/academics')}>Back to courses</Button>
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

export default CourseDetailPage;