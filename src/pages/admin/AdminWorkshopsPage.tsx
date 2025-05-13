
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Plus, Check, X, Eye, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: string;
  is_free: boolean;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  submitted_by?: string | null;
  updated_at?: string;
}

const AdminWorkshopsPage = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Cast the status field to the correct type
      const typedData = data?.map(workshop => ({
        ...workshop,
        status: workshop.status as 'pending' | 'approved' | 'rejected',
        location: workshop.location || '',
        description: workshop.description || ''
      })) || [];

      setWorkshops(typedData);
    } catch (error) {
      console.error('Error fetching workshops:', error);
      toast({
        title: 'Error',
        description: 'Failed to load workshops',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateWorkshopStatus = async (id: string, status: 'approved' | 'rejected') => {
    setProcessing(true);
    try {
      const { error } = await supabase
        .from('workshops')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setWorkshops(workshops.map(w => w.id === id ? { ...w, status } : w));
      setDialogOpen(false);
      setSelectedWorkshop(null);

      toast({
        title: `Workshop ${status}`,
        description: `The workshop has been ${status}.`,
      });
    } catch (error) {
      console.error(`Error ${status} workshop:`, error);
      toast({
        title: 'Error',
        description: `Failed to ${status} workshop`,
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const deleteWorkshop = async (id: string) => {
    if (!confirm('Are you sure you want to delete this workshop?')) return;

    setProcessing(true);
    try {
      const { error } = await supabase
        .from('workshops')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWorkshops(workshops.filter(w => w.id !== id));

      toast({
        title: 'Workshop deleted',
        description: 'The workshop has been permanently deleted.',
      });
    } catch (error) {
      console.error('Error deleting workshop:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete workshop',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Workshops Management</h1>
          <p className="text-muted-foreground">Manage workshop submissions and approvals</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Workshop
        </Button>
      </div>

      <div className="bg-white rounded-md shadow">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No workshops found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workshops.map((workshop) => (
                <TableRow key={workshop.id}>
                  <TableCell className="font-medium">{workshop.title}</TableCell>
                  <TableCell className="capitalize">{workshop.type}</TableCell>
                  <TableCell>
                    {workshop.date ? format(new Date(workshop.date), 'MMM d, yyyy') : 'Not set'}
                  </TableCell>
                  <TableCell>{workshop.location || 'Not set'}</TableCell>
                  <TableCell>{getStatusBadge(workshop.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setSelectedWorkshop(workshop);
                          setDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {workshop.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-green-600 hover:text-green-700"
                            onClick={() => updateWorkshopStatus(workshop.id, 'approved')}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => updateWorkshopStatus(workshop.id, 'rejected')}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteWorkshop(workshop.id)}
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

      {/* Workshop Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedWorkshop && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedWorkshop.title}</DialogTitle>
              <DialogDescription>
                Submitted on {format(new Date(selectedWorkshop.created_at), 'MMMM d, yyyy')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="text-muted-foreground">{selectedWorkshop.description || 'No description provided'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Type</h4>
                  <p className="capitalize">{selectedWorkshop.type}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Free Workshop?</h4>
                  <p>{selectedWorkshop.is_free ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Date</h4>
                  <p>{selectedWorkshop.date ? format(new Date(selectedWorkshop.date), 'MMMM d, yyyy') : 'Not set'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p>{selectedWorkshop.location || 'Not set'}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Status</h4>
                  <p>{getStatusBadge(selectedWorkshop.status)}</p>
                </div>
              </div>
            </div>

            {selectedWorkshop.status === 'pending' && (
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => updateWorkshopStatus(selectedWorkshop.id, 'rejected')}
                  disabled={processing}
                >
                  {processing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <X className="h-4 w-4 mr-2" />}
                  Reject
                </Button>
                <Button 
                  onClick={() => updateWorkshopStatus(selectedWorkshop.id, 'approved')}
                  disabled={processing}
                >
                  {processing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                  Approve
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        )}
      </Dialog>
    </AdminLayout>
  );
};

export default AdminWorkshopsPage;
