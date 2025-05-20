
import NavBar from "@/components/NavBar";
import AddNoteButton from "@/components/notes/AddNoteButton";
import NoteCard from "@/components/notes/NoteCard";
import NoteForm from "@/components/notes/NoteForm";
import SearchBar from "@/components/notes/SearchBar";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

// Sample note type
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// Sample data for demonstration
const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes',
    content: 'Diskusi dengan tim marketing tentang strategi Q4. Perlu follow up minggu depan.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Ideas for Project',
    content: 'Tambahkan fitur ekspor ke PDF. Perbaiki UI di halaman profil. Optimalkan performa load time.',
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: '3',
    title: 'Things to Remember',
    content: 'Bayar tagihan listrik. Jemput paket di kantor pos. Beli bahan makanan.',
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Filter notes when search query changes
  useEffect(() => {
    if (searchQuery) {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
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
    
    setIsLoading(true);
    try {
      // In a real app, this would be a call to Supabase to delete the note
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      setNotes(notes.filter(note => note.id !== noteToDelete));
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setNoteToDelete(null);
    }
  };

  const handleSaveNote = async (noteData: { id?: string; title: string; content: string }) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be a call to Supabase to save or update the note
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (noteData.id) {
        // Update existing note
        setNotes(notes.map(note => 
          note.id === noteData.id 
            ? { ...note, title: noteData.title, content: noteData.content }
            : note
        ));
        toast({
          title: "Note updated",
          description: "Your note has been updated successfully",
        });
      } else {
        // Create new note
        const newNote: Note = {
          id: Date.now().toString(), // In a real app, this would be a UUID from the server
          title: noteData.title,
          content: noteData.content,
          createdAt: new Date().toISOString(),
        };
        setNotes([newNote, ...notes]);
        toast({
          title: "Note created",
          description: "Your new note has been created successfully",
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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

        {filteredNotes.length === 0 ? (
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
                content={note.content}
                createdAt={note.createdAt}
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
        isLoading={isLoading}
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
            <AlertDialogAction onClick={confirmDelete} disabled={isLoading}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Notes;
