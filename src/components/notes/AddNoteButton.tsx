
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddNoteButtonProps {
  onClick: () => void;
  label?: string;
}

const AddNoteButton = ({ onClick, label = "Tambah Catatan" }: AddNoteButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center gap-2 shadow-sm bg-primary hover:bg-primary/90"
    >
      <Plus className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  );
};

export default AddNoteButton;
