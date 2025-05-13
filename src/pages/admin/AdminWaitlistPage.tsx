
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Mail, Check, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  interest: string;
  status: 'pending' | 'contacted' | 'not-interested';
  created_at: string;
}

const AdminWaitlistPage = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Cast the status field to the correct type
      const typedData = data?.map(entry => ({
        ...entry,
        name: entry.name || '',
        interest: entry.interest || '',
        status: entry.status as 'pending' | 'contacted' | 'not-interested'
      })) || [];

      setEntries(typedData);
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      toast({
        title: 'Error',
        description: 'Failed to load waitlist entries',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateEntryStatus = async (id: string, status: 'pending' | 'contacted' | 'not-interested') => {
    try {
      const { error } = await supabase
        .from('waitlist')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setEntries(entries.map(entry => entry.id === id ? { ...entry, status } : entry));

      toast({
        title: `Status updated`,
        description: `The waitlist entry status has been updated to ${status}.`,
      });
    } catch (error) {
      console.error(`Error updating entry status:`, error);
      toast({
        title: 'Error',
        description: `Failed to update entry status`,
        variant: 'destructive',
      });
    }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this waitlist entry?')) return;

    try {
      const { error } = await supabase
        .from('waitlist')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEntries(entries.filter(entry => entry.id !== id));

      toast({
        title: 'Entry deleted',
        description: 'The waitlist entry has been permanently deleted.',
      });
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete waitlist entry',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'contacted':
        return <Badge className="bg-green-500">Contacted</Badge>;
      case 'not-interested':
        return <Badge variant="destructive">Not Interested</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Waitlist Management</h1>
        <p className="text-muted-foreground">Manage people who joined the waitlist</p>
      </div>

      <div className="bg-white rounded-md shadow">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No waitlist entries found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">{entry.name || 'N/A'}</TableCell>
                  <TableCell>{entry.email}</TableCell>
                  <TableCell>{entry.interest || 'N/A'}</TableCell>
                  <TableCell>{format(new Date(entry.created_at), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(entry.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        title="Send Email"
                        onClick={() => window.open(`mailto:${entry.email}`, '_blank')}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      {entry.status !== 'contacted' && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-green-600 hover:text-green-700"
                          title="Mark as Contacted"
                          onClick={() => updateEntryStatus(entry.id, 'contacted')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-600 hover:text-red-700"
                        title="Delete Entry"
                        onClick={() => deleteEntry(entry.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminWaitlistPage;
