
import NavBar from "@/components/NavBar";
import AddNoteButton from "@/components/notes/AddNoteButton";
import NoteCard from "@/components/notes/NoteCard";
import NoteForm from "@/components/notes/NoteForm";
import SearchBar from "@/components/notes/SearchBar";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { fetchNotes, createNote, updateNote, deleteNote, Note } from "@/services/notesService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Notes = () => {
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch notes with React Query
  const { data: notes = [], isLoading, error } = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes
  });

  // Create note mutation
  const createNoteMutation = useMutation({
    mutationFn: (noteData: { title: string; content: string }) => 
      createNote(noteData.title, noteData.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: "Note created",
        description: "Your new note has been created successfully",
      });
      setIsFormOpen(false);
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  });

  // Update note mutation
  const updateNoteMutation = useMutation({
    mutationFn: (noteData: { id: string; title: string; content: string }) => 
      updateNote(noteData.id, noteData.title, noteData.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully",
      });
      setIsFormOpen(false);
    },
    onError: (error) => {
      console.error("Error updating note:", error);
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  });

  // Delete note mutation
  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully",
      });
      setNoteToDelete(null);
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  });

  // Filter notes when search query or notes change
  useEffect(() => {
    if (searchQuery && notes) {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [searchQuery, notes]);

  const handleAddNote = () => {
    setCurrentNote(undefined);
    setIsFormOpen(true);
  };

  const handleEditNote = (id: string) => {
    const note = notes.find(note => note.id === id);
    if (note) {
      setCurrentNote(note);
      setIsFormOpen(true);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNoteToDelete(id);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    deleteNoteMutation.mutate(noteToDelete);
  };

  const handleSaveNote = async (noteData: { id?: string; title: string; content: string }) => {
    if (noteData.id && currentNote) {
      updateNoteMutation.mutate({
        id: noteData.id,
        title: noteData.title,
        content: noteData.content
      });
    } else {
      createNoteMutation.mutate({
        title: noteData.title,
        content: noteData.content
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-secondary/30">
        <NavBar isLoggedIn={true} />
        <div className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Error loading notes</h2>
            <p>Please check your connection and try again</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <NavBar isLoggedIn={true} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Catatan Anda</h1>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-64">
              <SearchBar onSearch={handleSearch} />
            </div>
            <AddNoteButton onClick={handleAddNote} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading notes...</span>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            {searchQuery ? (
              <>
                <p className="text-2xl font-semibold mb-2">No results found</p>
                <p className="text-gray-500">Try using different keywords or clear your search</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-semibold mb-2">No notes yet</p>
                <p className="text-gray-500 mb-6">Create your first note to get started</p>
                <AddNoteButton onClick={handleAddNote} label="Create First Note" />
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content || ""}
                createdAt={note.created_at}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>

      <NoteForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveNote}
        note={currentNote}
        isLoading={createNoteMutation.isPending || updateNoteMutation.isPending}
      />

      <AlertDialog open={!!noteToDelete} onOpenChange={() => setNoteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleteNoteMutation.isPending}>
              {deleteNoteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Notes;
