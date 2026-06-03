import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
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

import { Link } from 'react-router-dom';

import {
  BarChart3,
  DollarSign,
  BookOpen,
  Bell,
} from 'lucide-react';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const students = await pb.collection('users').getFullList({
          filter: `id = "${currentUser.id}"`,
          $autoCancel: false,
        });

        if (students.length > 0) {
          setStudentData(students[0]);
        }

        const announcementsList = await pb.collection('announcements').getList(1, 3, {
          sort: '-created',
          $autoCancel: false,
        });

        setAnnouncements(announcementsList.items);

        const feesList = await pb.collection('fees').getFullList({
          filter: `student_id = "${currentUser.id}"`,
          sort: '-created',
          $autoCancel: false,
        });

        setFees(feesList);

      } catch (error) {

        console.error('Error fetching data:', error);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, [currentUser.id]);

  const pendingFees = fees.filter(
    f => f.status === 'Pending' || f.status === 'Overdue'
  ).length;

  return (
    <>
      <Helmet>
        <title>Student dashboard - Sversity</title>

        <meta
          name="description"
          content="View your academic progress, attendance, fees, and announcements."
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
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Welcome back, {currentUser?.name}
                </h1>

                <p className="text-slate-500">
                  Here's what's happening with your academics today
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

                  {/* Attendance */}
                  <Card className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-blue-100
                    bg-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:scale-[1.03]
                    hover:shadow-2xl
                    hover:border-blue-400
                    cursor-pointer
                  ">

                    <div className="
                      absolute inset-0
                      bg-gradient-to-r
                      from-blue-500/10
                      to-indigo-500/10
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "></div>

                    <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">

                      <div>
                        <CardTitle className="text-sm font-semibold text-slate-700">
                          Attendance
                        </CardTitle>
                      </div>

                      <div className="
                        w-12 h-12
                        rounded-2xl
                        bg-blue-100
                        flex items-center justify-center
                        transition-all duration-300
                        group-hover:bg-blue-500
                        group-hover:scale-110
                      ">
                        <BarChart3 className="
                          h-6 w-6
                          text-blue-600
                          transition-all duration-300
                          group-hover:text-white
                        " />
                      </div>

                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="text-4xl font-bold text-slate-800">
                        {studentData?.attendance_percentage || 0}%
                      </div>

                      <p className="text-sm text-slate-500 mt-2">
                        Overall attendance rate
                      </p>
                    </CardContent>
                  </Card>

                  {/* GPA */}
                  <Card className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-emerald-100
                    bg-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:scale-[1.03]
                    hover:shadow-2xl
                    hover:border-emerald-400
                    cursor-pointer
                  ">

                    <div className="
                      absolute inset-0
                      bg-gradient-to-r
                      from-emerald-500/10
                      to-teal-500/10
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "></div>

                    <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-semibold text-slate-700">
                        GPA
                      </CardTitle>

                      <div className="
                        w-12 h-12
                        rounded-2xl
                        bg-emerald-100
                        flex items-center justify-center
                        transition-all duration-300
                        group-hover:bg-emerald-500
                        group-hover:scale-110
                      ">
                        <BookOpen className="
                          h-6 w-6
                          text-emerald-600
                          transition-all duration-300
                          group-hover:text-white
                        " />
                      </div>

                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-4xl font-bold text-slate-800">
                        {studentData?.gpa?.toFixed(2) || '0'}
                      </div>

                      <p className="text-sm text-slate-500 mt-2">
                        Current GPA
                      </p>
                    </CardContent>
                  </Card>

                  {/* Pending Fees */}
                  <Card className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-orange-100
                    bg-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:scale-[1.03]
                    hover:shadow-2xl
                    hover:border-orange-400
                    cursor-pointer
                  ">

                    <div className="
                      absolute inset-0
                      bg-gradient-to-r
                      from-orange-500/10
                      to-amber-500/10
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "></div>

                    <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">

                      <CardTitle className="text-sm font-semibold text-slate-700">
                        Pending Fees
                      </CardTitle>

                      <div className="
                        w-12 h-12
                        rounded-2xl
                        bg-orange-100
                        flex items-center justify-center
                        transition-all duration-300
                        group-hover:bg-orange-500
                        group-hover:scale-110
                      ">
                        <DollarSign className="
                          h-6 w-6
                          text-orange-600
                          transition-all duration-300
                          group-hover:text-white
                        " />
                      </div>

                    </CardHeader>

                    <CardContent className="relative z-10">
                      <div className="text-4xl font-bold text-slate-800">
                        {pendingFees}
                      </div>

                      <p className="text-sm text-slate-500 mt-2">
                        Outstanding payments
                      </p>
                    </CardContent>
                  </Card>


                  {/* Program */}
                  <Card className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-violet-100
                bg-white
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:scale-[1.03]
                hover:shadow-2xl
                hover:border-violet-400
                cursor-pointer
              ">

                    {/* Hover Gradient */}
                    <div className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-violet-500/10
                  to-fuchsia-500/10
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                "></div>

                    <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">

                      <div>
                        <CardTitle className="text-sm font-semibold text-slate-700">
                          Program
                        </CardTitle>
                      </div>

                      <div className="
                      w-12 h-12
                      rounded-2xl
                      bg-violet-100
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover:bg-violet-500
                      group-hover:scale-110
                    ">
                        <Bell className="
                          h-6 w-6
                          text-violet-600
                          transition-all duration-300
                          group-hover:text-white
                        " />
                      </div>

                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="text-2xl font-bold text-slate-800 leading-snug">
                        {studentData?.program || 'N/A'}
                      </div>

                      <p className="text-sm text-slate-500 mt-2">
                        Current enrollment program
                      </p>

                    </CardContent>
                  </Card>



                </div>
              )}

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Announcements */}
                <Card
                  className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-violet-100
              bg-white
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              hover:border-violet-400
            "
                >

                  {/* Hover Gradient */}
                  <div
                    className="
              absolute inset-0
              bg-gradient-to-r
              from-violet-500/5
              to-fuchsia-500/5
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
            "
                  ></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="
              w-12 h-12
              rounded-2xl
              bg-violet-100
              flex items-center justify-center
              transition-all duration-300
              group-hover:bg-violet-500
              group-hover:scale-110
            ">
                        <Bell className="
            h-6 w-6
            text-violet-600
            transition-all duration-300
            group-hover:text-white
          " />
                      </div>

                      <div>
                        <CardTitle className="text-xl text-slate-800">
                          Recent Announcements
                        </CardTitle>

                        <CardDescription>
                          Latest updates from administration
                        </CardDescription>
                      </div>

                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-5">
                    {announcements.length === 0 ? (
                      <div className="
          rounded-2xl
          bg-slate-50
          p-6
          text-center
          text-slate-500
        ">
                        No announcements available
                      </div>

                    ) : (
                      announcements.map((announcement) => (
                        <div
                          key={announcement.id}
                          className="
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
              p-5
              transition-all
              duration-300
              hover:bg-white
              hover:shadow-lg
              hover:border-violet-300
            "
                        >

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-semibold text-slate-800">
                                {announcement.title}
                              </h4>
                              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                {announcement.content}
                              </p>
                            </div>
                            <div className="
                px-3 py-1
                rounded-full
                bg-violet-100
                text-violet-700
                text-xs
                font-medium
                whitespace-nowrap
              ">
                              New
                            </div>
                          </div>
                          <p className="text-xs text-slate-400 mt-4">
                            {new Date(announcement.created).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}

                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-cyan-100
                    bg-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-2xl
                    hover:border-cyan-400
                  "
                >

                  {/* Hover Gradient */}
                  <div
                    className="
                        absolute inset-0
                        bg-gradient-to-r
                        from-cyan-500/5
                        to-blue-500/5
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                      "
                  ></div>

                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl text-slate-800">
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Common shortcuts and student tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 space-y-5">

                    {/* View Grades */}
                    <Link to="/academics">

                      <div
                        className="
                        group/action
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-slate-100
                        bg-slate-50
                        p-5
                        transition-all
                        duration-300
                        hover:bg-white
                        hover:shadow-lg
                        hover:border-emerald-300
                        cursor-pointer
                        mb-4
                      "
                      >

                        <div className="flex items-center gap-4">

                          <div className="
                w-12 h-12
                rounded-2xl
                bg-emerald-100
                flex items-center justify-center
                transition-all duration-300
                group-hover/action:bg-emerald-500
              ">
                            <BookOpen className="
                h-6 w-6
                text-emerald-600
                transition-all duration-300
                group-hover/action:text-white
              " />
                          </div>

                          <div>
                            <h4 className="font-semibold text-slate-800">
                              View Grades
                            </h4>
                            <p className="text-sm text-slate-500">
                              Check your academic performance
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Pay Fees */}
                    <Link to="/fees">

                      <div
                        className="
                        group/action
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-slate-100
                        bg-slate-50
                        p-5
                        transition-all
                        duration-300
                        hover:bg-white
                        hover:shadow-lg
                        hover:border-orange-300
                        cursor-pointer
                        mb-4
                      "
                      >

                        <div className="flex items-center gap-4">

                          <div className="
                      w-12 h-12
                      rounded-2xl
                      bg-orange-100
                      flex items-center justify-center
                      transition-all duration-300
                      group-hover/action:bg-orange-500
                    ">
                            <DollarSign className="
                    h-6 w-6
                    text-orange-600
                    transition-all duration-300
                    group-hover/action:text-white
                  " />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">
                              Pay Fees
                            </h4>
                            <p className="text-sm text-slate-500">
                              Manage fee payments
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Attendance */}
                    <Link to="/academics">
                      <div
                        className="
                          group/action
                          flex
                          items-center
                          justify-between
                          rounded-2xl
                          border
                          border-slate-100
                          bg-slate-50
                          p-5
                          transition-all
                          duration-300
                          hover:bg-white
                          hover:shadow-lg
                          hover:border-blue-300
                          cursor-pointer
                        "
                      >
                        <div className="flex items-center gap-4">
                          <div className="
                          w-12 h-12
                          rounded-2xl
                          bg-blue-100
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover/action:bg-blue-500
                        ">
                            <BarChart3 className="
                              h-6 w-6
                              text-blue-600
                              transition-all duration-300
                              group-hover/action:text-white
                            " />
                          </div>

                          <div>
                            <h4 className="font-semibold text-slate-800">
                              Check Attendance
                            </h4>
                            <p className="text-sm text-slate-500">
                              Monitor attendance records
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
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

export default StudentDashboard;

