
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, BookOpen, User, Clock } from 'lucide-react';

interface DashboardStats {
  workshopCount: number;
  courseCount: number;
  waitlistCount: number;
  pendingWorkshops: number;
}

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats>({
    workshopCount: 0,
    courseCount: 0,
    waitlistCount: 0,
    pendingWorkshops: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch workshop count
        const { count: workshopCount, error: workshopError } = await supabase
          .from('workshops')
          .select('*', { count: 'exact', head: true });

        if (workshopError) throw workshopError;

        // Fetch pending workshop count
        const { count: pendingCount, error: pendingError } = await supabase
          .from('workshops')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        if (pendingError) throw pendingError;

        // Fetch course count
        const { count: courseCount, error: courseError } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true });

        if (courseError) throw courseError;

        // Fetch waitlist count
        const { count: waitlistCount, error: waitlistError } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });

        if (waitlistError) throw waitlistError;

        setStats({
          workshopCount: workshopCount || 0,
          courseCount: courseCount || 0,
          waitlistCount: waitlistCount || 0,
          pendingWorkshops: pendingCount || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Workshops',
      value: stats.workshopCount,
      description: 'Total workshops created',
      icon: CalendarCheck,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Total Courses',
      value: stats.courseCount,
      description: 'Published and draft courses',
      icon: BookOpen,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Waitlist Entries',
      value: stats.waitlistCount,
      description: 'People waiting to join',
      icon: User,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      title: 'Pending Workshops',
      value: stats.pendingWorkshops,
      description: 'Workshops awaiting approval',
      icon: Clock,
      color: 'text-amber-600 bg-amber-100',
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Chetna Academy admin panel.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.value}
              </div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Recent activities and other dashboard widgets would go here */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest actions in the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-muted-foreground">
              Activity tracking will be implemented soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="space-y-2">
              <li className="p-2 hover:bg-muted rounded-md transition-colors">
                <a href="/admin/workshops" className="block">
                  Review pending workshops
                </a>
              </li>
              <li className="p-2 hover:bg-muted rounded-md transition-colors">
                <a href="/admin/courses" className="block">
                  Create a new course
                </a>
              </li>
              <li className="p-2 hover:bg-muted rounded-md transition-colors">
                <a href="/admin/waitlist" className="block">
                  Manage waitlist entries
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
