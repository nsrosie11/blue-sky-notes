
import { supabase } from "@/integrations/supabase/client";

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id?: string;
}

export const fetchNotes = async (): Promise<Note[]> => {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
  
  return data || [];
};

export const createNote = async (title: string, content: string): Promise<Note> => {
  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content }])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating note:', error);
    throw error;
  }
  
  return data;
};

export const updateNote = async (id: string, title: string, content: string): Promise<Note> => {
  const { data, error } = await supabase
    .from('notes')
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating note:', error);
    throw error;
  }
  
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
