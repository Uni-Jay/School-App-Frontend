import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { RoleCountBar } from "@/components/charts/RoleCountBar";
import { EventsCalendar } from "@/components/calendar/EventsCalendar";
import { SchoolPerformanceLine } from "@/components/charts/SchoolPerformanceLine";
import { AttendanceBarChart } from "@/components/charts/AttendanceBarChart";
import { FinanceStackedBar } from "@/components/charts/FinanceStackedBar";
import { SchoolsTable } from "@/components/tables/SchoolsTable";
import { TopStudentsTable } from "@/components/tables/TopStudentsTable";
import { TeachersTable } from "@/components/tables/TeachersTable";
import { SchoolFeesTable } from "@/components/tables/SchoolFeesTable";
import { NotificationCard } from "@/components/cards/NotificationCard";
import { AnnouncementCard } from "@/components/cards/AnnouncementCard";
import GenderPieChart from "./GenderPieChart";

const SuperAdminDashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Gender Distribution */}
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Gender Distribution</h2>
          <GenderPieChart />
        </CardContent>
      </Card>

      {/* Role Counts */}
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">User Role Counts</h2>
          <RoleCountBar />
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card className="col-span-1 lg:col-span-3">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Events & Public Holidays</h2>
          <EventsCalendar />
        </CardContent>
      </Card>

      {/* Notifications and Announcements */}
      <NotificationCard />
      <AnnouncementCard />

      {/* Schools & Admins */}
      <Card className="col-span-1 lg:col-span-3">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Schools and Admins</h2>
          <SchoolsTable />
        </CardContent>
      </Card>

      {/* Best Schools over 7 years */}
      <Card className="col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Best Schools (7 Years)</h2>
          <SchoolPerformanceLine />
        </CardContent>
      </Card>

      {/* Top Students */}
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Top Students</h2>
          <TopStudentsTable />
        </CardContent>
      </Card>

      {/* Finances */}
      <Card className="col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">School Finances</h2>
          <FinanceStackedBar />
        </CardContent>
      </Card>

      {/* Attendance */}
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Top Attendance</h2>
          <AttendanceBarChart />
        </CardContent>
      </Card>

      {/* Best Teachers */}
      <Card className="col-span-1 lg:col-span-2">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Best Teachers</h2>
          <TeachersTable />
        </CardContent>
      </Card>

      {/* School Fees */}
      <Card className="col-span-1">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">School Fees</h2>
          <SchoolFeesTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
