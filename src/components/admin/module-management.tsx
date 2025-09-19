'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ModuleForm } from './module-form';
import { ModuleVideoForm } from './module-video-form';
import { Plus, Edit, Trash2, GripVertical, Video, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Module {
  id: string;
  title: string;
  slug: string;
  description: string;
  video_duration_minutes: number;
  order_index: number;
  type: string;
  tagline?: string;
  video_url?: string;
  loom_video_id?: string;
}

interface ModuleManagementProps {
  courseId: string;
  courseSlug: string;
  modules: Module[];
}

export function ModuleManagement({ courseId, courseSlug, modules }: ModuleManagementProps) {
  const router = useRouter();
  const [modulesList, setModulesList] = useState(modules || []);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [deletingModule, setDeletingModule] = useState<Module | null>(null);
  const [reordering, setReordering] = useState(false);

  // Add function to refresh modules from database
  const refreshModules = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      if (data) {
        setModulesList(data);
      }
    } catch (error) {
      console.error('Error refreshing modules:', error);
    }
  };

  const handleAddModule = () => {
    setEditingModule(null);
    setIsAddDialogOpen(true);
  };

  const handleEditModule = (module: Module) => {
    setEditingModule(module);
    setIsAddDialogOpen(true);
  };

  const handleDeleteModule = async () => {
    if (!deletingModule) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', deletingModule.id);

      if (error) throw error;

      toast.success('Module deleted successfully');
      setModulesList(modulesList.filter(m => m.id !== deletingModule.id));
      setDeletingModule(null);
      router.refresh();
    } catch (error: any) {
      console.error('Error deleting module:', error);
      toast.error(error.message || 'Failed to delete module');
    }
  };

  const handleMoveModule = async (moduleId: string, direction: 'up' | 'down') => {
    const currentIndex = modulesList.findIndex(m => m.id === moduleId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= modulesList.length) return;

    // Create a new array with swapped positions
    const newModulesList = [...modulesList];
    const temp = newModulesList[currentIndex];
    newModulesList[currentIndex] = newModulesList[newIndex];
    newModulesList[newIndex] = temp;

    // Update order indices
    const updatedModules = newModulesList.map((module, index) => ({
      ...module,
      order_index: index + 1
    }));

    setModulesList(updatedModules);
    setReordering(true);

    try {
      const supabase = createClient();
      
      // Update all modules with new order indices
      const updates = updatedModules.map(module => 
        supabase
          .from('modules')
          .update({ order_index: module.order_index })
          .eq('id', module.id)
      );

      await Promise.all(updates);
      
      toast.success('Module order updated');
      router.refresh();
    } catch (error: any) {
      console.error('Error reordering modules:', error);
      toast.error('Failed to update module order');
      // Revert on error
      setModulesList(modules);
    } finally {
      setReordering(false);
    }
  };

  const getNextOrderIndex = () => {
    if (modulesList.length === 0) return 1;
    return Math.max(...modulesList.map(m => m.order_index)) + 1;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-pure-white">Course Modules</h2>
        <div className="flex gap-2">
          <Button onClick={refreshModules} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          <Button onClick={handleAddModule} className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Module
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {modulesList.length === 0 ? (
          <Card className="bg-slate-gray border-slate-gray">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No modules added yet</p>
              <Button onClick={handleAddModule} variant="outline">
                Add Your First Module
              </Button>
            </CardContent>
          </Card>
        ) : (
          modulesList
            .sort((a, b) => a.order_index - b.order_index)
            .map((module, index) => (
              <Card key={module.id} className="bg-slate-gray border-slate-gray">
                <CardHeader className="border-b border-carbon-black">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMoveModule(module.id, 'up')}
                          disabled={index === 0 || reordering}
                          className="p-1 h-6"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMoveModule(module.id, 'down')}
                          disabled={index === modulesList.length - 1 || reordering}
                          className="p-1 h-6"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <CardTitle className="text-pure-white flex items-center gap-2">
                          <span className="text-muted-foreground">Module {module.order_index}:</span>
                          {module.title}
                          {module.type === 'video' && <Video className="w-4 h-4 text-muted-foreground" />}
                        </CardTitle>
                        {module.tagline && (
                          <p className="text-sm text-muted-foreground mt-1">{module.tagline}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditModule(module)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setDeletingModule(module)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>Duration: {module.video_duration_minutes} minutes</span>
                    <span>Type: {module.type}</span>
                    <span>Slug: {module.slug}</span>
                  </div>
                  {module.type === 'video' && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-medium mb-3">Video Content</h4>
                      <ModuleVideoForm module={module} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
        )}
      </div>

      {/* Add/Edit Module Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingModule ? 'Edit Module' : 'Add New Module'}
            </DialogTitle>
            <DialogDescription>
              {editingModule 
                ? 'Update the module details below.' 
                : 'Fill in the details to create a new module for this course.'}
            </DialogDescription>
          </DialogHeader>
          <ModuleForm
            courseId={courseId}
            module={editingModule}
            onSuccess={async () => {
              setIsAddDialogOpen(false);
              // Refresh the modules list
              await refreshModules();
              router.refresh();
            }}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingModule} onOpenChange={() => setDeletingModule(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Module</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingModule?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteModule}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 