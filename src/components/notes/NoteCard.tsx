
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ id, title, content, createdAt, onEdit, onDelete }: NoteCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200 border border-border animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="text-gray-600 line-clamp-4 text-sm">{content}</p>
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between border-t border-gray-100">
        <span className="text-xs text-gray-500">{formattedDate}</span>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(id)} title="Edit note">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(id)} title="Delete note">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
