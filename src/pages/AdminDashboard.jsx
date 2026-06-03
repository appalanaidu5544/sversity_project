import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import Logout from '@/components/Logout';
import Sidebar from '@/components/Sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  BookOpen,
} from 'lucide-react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    pendingAdmissions: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const students = await pb
          .collection('students')
          .getFullList({ $autoCancel: false });

        const users = await pb
          .collection('users')
          .getFullList({ $autoCancel: false });

        const admissions = await pb
          .collection('admissions')
          .getFullList({
            filter: 'status = "Pending"',
            $autoCancel: false,
          });

        const fees = await pb
          .collection('fees')
          .getFullList({
            filter: 'status = "Paid"',
            $autoCancel: false,
          });

        const faculty = users.filter(
          user => user.role === 'faculty'
        );

        const revenue = fees.reduce(
          (sum, fee) => sum + fee.amount,
          0
        );

        setStats({
          totalStudents: students.length,
          totalFaculty: faculty.length,
          pendingAdmissions: admissions.length,
          totalRevenue: revenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin dashboard - Sversity</title>

        <meta
          name="description"
          content="Manage students, faculty, admissions, and fees from your admin dashboard."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Logout />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

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
            <div className="max-w-7xl mx-auto space-y-8">

              {/* Heading */}
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Admin Dashboard
                </h1>

                <p className="text-slate-500">
                  System overview and quick access to management tools
                </p>
              </div>

              {/* Stats Cards */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-16" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  {/* Students */}
                  <Card className="border-0 shadow-md rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Students
                      </CardTitle>

                      <Users className="h-5 w-5 text-blue-500" />
                    </CardHeader>

                    <CardContent>
                      <div className="text-3xl font-bold text-slate-800">
                        {stats.totalStudents}
                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        Enrolled students
                      </p>
                    </CardContent>
                  </Card>

                  {/* Faculty */}
                  <Card className="border-0 shadow-md rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Faculty
                      </CardTitle>

                      <GraduationCap className="h-5 w-5 text-emerald-500" />
                    </CardHeader>

                    <CardContent>
                      <div className="text-3xl font-bold text-slate-800">
                        {stats.totalFaculty}
                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        Active faculty members
                      </p>
                    </CardContent>
                  </Card>

                  {/* Admissions */}
                  <Card className="border-0 shadow-md rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Pending Admissions
                      </CardTitle>

                      <FileText className="h-5 w-5 text-orange-500" />
                    </CardHeader>

                    <CardContent>
                      <div className="text-3xl font-bold text-slate-800">
                        {stats.pendingAdmissions}
                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        Awaiting review
                      </p>
                    </CardContent>
                  </Card>

                  {/* Revenue */}
                  <Card className="border-0 shadow-md rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        Revenue
                      </CardTitle>

                      <DollarSign className="h-5 w-5 text-pink-500" />
                    </CardHeader>

                    <CardContent>
                      <div className="text-3xl font-bold text-slate-800">
                        ${stats.totalRevenue.toLocaleString()}
                      </div>

                      <p className="text-xs text-slate-500 mt-1">
                        Total collected
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {/* Admissions Card */}
                <Card
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-blue-100
                    bg-white
                    shadow-lg
                    transition-all
                    duration-300
                    ease-in-out
                    hover:-translate-y-3
                    hover:scale-[1.03]
                    hover:shadow-2xl
                    hover:border-blue-400
                    cursor-pointer
                  "
                >
                  {/* Hover Gradient */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-blue-500/10
                      to-indigo-500/10
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                  ></div>

                  <CardHeader className="relative z-10">

                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        mb-5
                        transition-all
                        duration-300
                        group-hover:bg-blue-500
                        group-hover:scale-110
                        group-hover:rotate-3
                      "
                    >
                      <FileText
                        className="
                          h-8
                          w-8
                          text-blue-600
                          transition-all
                          duration-300
                          group-hover:text-white
                        "
                      />
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-800">
                      Admissions
                    </CardTitle>

                    <CardDescription className="text-slate-500">
                      Review and manage student applications
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <Button
                      asChild
                      className="
                        w-full
                        rounded-xl
                        bg-blue-600
                        hover:bg-blue-700
                      "
                    >
                      <Link to="/AdminAdmissionsPage">
                        Manage Admissions
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Academics Card */}
                <Card
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-emerald-100
                    bg-white
                    shadow-lg
                    transition-all
                    duration-300
                    ease-in-out
                    hover:-translate-y-3
                    hover:scale-[1.03]
                    hover:shadow-2xl
                    hover:border-emerald-400
                    cursor-pointer
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-emerald-500/10
                      to-teal-500/10
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                  ></div>

                  <CardHeader className="relative z-10">

                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-emerald-100
                        flex
                        items-center
                        justify-center
                        mb-5
                        transition-all
                        duration-300
                        group-hover:bg-emerald-500
                        group-hover:scale-110
                        group-hover:rotate-3
                      "
                    >
                      <BookOpen
                        className="
                          h-8
                          w-8
                          text-emerald-600
                          transition-all
                          duration-300
                          group-hover:text-white
                        "
                      />
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-800">
                      Academics
                    </CardTitle>

                    <CardDescription className="text-slate-500">
                      Manage courses and enrollments
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <Button
                      asChild
                      className="
                        w-full
                        rounded-xl
                        bg-emerald-600
                        hover:bg-emerald-700
                      "
                    >
                      <Link to="/AdminCoursesPage">
                        Manage Courses
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Fees Card */}
                <Card
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-orange-100
                    bg-white
                    shadow-lg
                    transition-all
                    duration-300
                    ease-in-out
                    hover:-translate-y-3
                    hover:scale-[1.03]
                    hover:shadow-2xl
                    hover:border-orange-400
                    cursor-pointer
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-orange-500/10
                      to-rose-500/10
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                  ></div>

                  <CardHeader className="relative z-10">

                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        mb-5
                        transition-all
                        duration-300
                        group-hover:bg-orange-500
                        group-hover:scale-110
                        group-hover:rotate-3
                      "
                    >
                      <DollarSign
                        className="
                          h-8
                          w-8
                          text-orange-600
                          transition-all
                          duration-300
                          group-hover:text-white
                        "
                      />
                    </div>

                    <CardTitle className="text-2xl font-bold text-slate-800">
                      Fee Payments
                    </CardTitle>

                    <CardDescription className="text-slate-500">
                      Track and manage student fees
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <Button
                      asChild
                      className="
                        w-full
                        rounded-xl
                        bg-orange-600
                        hover:bg-orange-700
                      "
                    >
                      <Link to="/AdminFeesPage">
                        Manage Fees
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;