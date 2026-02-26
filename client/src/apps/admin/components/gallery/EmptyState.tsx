import { motion } from "framer-motion";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddNew: () => void;
}

export function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="rounded-full bg-secondary p-6 mb-6">
        <ImagePlus className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="font-display text-2xl font-medium text-foreground mb-2">
        No images yet
      </h3>
      <p className="text-muted-foreground max-w-md mb-8">
        Start building your gallery by adding your first image. 
      </p>
      <Button 
        onClick={onAddNew}
        className="bg-primary hover:bg-primary/90 shadow-gold"
      >
        <ImagePlus className="h-4 w-4 mr-2" />
        Add Your First Image
      </Button>
    </motion.div>
  );
}