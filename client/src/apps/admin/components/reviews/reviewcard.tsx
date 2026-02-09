import { Star, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PropertyReview } from "@/types/property";

interface Props {
  review: PropertyReview;
  onEdit: (r: PropertyReview) => void;
  onDelete: (id: number) => void;
}

export default function ReviewCard({ review, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 flex gap-4 transition-shadow hover:shadow-md">
      <img
        src={
          review.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewer_name)}&background=random`
        }
        alt={review.reviewer_name}
        className="h-12 w-12 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-card-foreground leading-tight">
              {review.reviewer_name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {review.country} ·{" "}
              {review.property_name || `Property #${review.property}`}
            </p>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {review.comment}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {new Date(review.created_at).toLocaleDateString()}
          </span>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onEdit(review)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={() => onDelete(review.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
