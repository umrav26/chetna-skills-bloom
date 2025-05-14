import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Mail, Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'trainer' | 'student';
  created_at: string;
  course?: string;
}

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trainers' | 'students'>('trainers');

  useEffect(() => {
    fetchApplications(activeTab);
  }, [activeTab]);

  const fetchApplications = async (type: 'trainers' | 'students') => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('type', type === 'trainers' ? 'trainer' : 'student')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type assertion to match our Application interface
      setApplications(data as Application[] || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setApplications(applications.map(app => app.id === id ? { ...app, status } : app));

      toast({
        title: `Application ${status}`,
        description: `The application has been ${status}`,
      });
    } catch (error) {
      console.error(`Error updating application status:`, error);
      toast({
        title: 'Error',
        description: `Failed to update application status`,
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-muted-foreground">Manage trainer and student applications</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'trainers' | 'students')}>
        <TabsList className="mb-4">
          <TabsTrigger value="trainers">Trainer Applications</TabsTrigger>
          <TabsTrigger value="students">Student Applications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trainers" className="bg-white rounded-md shadow">
          {renderApplicationsTable('trainers')}
        </TabsContent>
        
        <TabsContent value="students" className="bg-white rounded-md shadow">
          {renderApplicationsTable('students')}
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );

  function renderApplicationsTable(type: 'trainers' | 'students') {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    if (applications.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No {type} applications found</p>
        </div>
      );
    }
    
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.name}</TableCell>
              <TableCell>{application.email}</TableCell>
              <TableCell>{application.phone}</TableCell>
              <TableCell>{format(new Date(application.created_at), 'MMM d, yyyy')}</TableCell>
              <TableCell>{getStatusBadge(application.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    title="Send Email"
                    onClick={() => window.open(`mailto:${application.email}`, '_blank')}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  
                  {application.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-600 hover:text-green-700"
                        title="Approve Application"
                        onClick={() => updateApplicationStatus(application.id, 'approved')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        title="Reject Application"
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export default AdminApplicationsPage;
