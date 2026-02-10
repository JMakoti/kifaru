import { useState } from "react";
import { Star, Pencil, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PropertyReview } from "@/types/property";

interface Props {
  review: PropertyReview;
  onEdit: (r: PropertyReview) => void;
  onDelete: (id: number) => void;
}

export default function ReviewCard({ review, onEdit, onDelete }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper to generate initials if no avatar exists
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    review.reviewer_name
  )}&background=random&size=128`;

  return (
    <div className="group rounded-lg border border-border bg-card p-5 flex gap-4 transition-all hover:shadow-md hover:border-accent/50">
      {/* Avatar Section */}
      <div className="shrink-0">
        <img
          src={review.avatar || fallbackAvatar}
          alt={review.reviewer_name}
          className="h-12 w-12 rounded-full object-cover border border-border shadow-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackAvatar;
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        {/* Header: Name, Rating, and Location */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-card-foreground leading-tight truncate">
              {review.reviewer_name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                <MapPin className="h-3 w-3" /> {review.country}
              </span>
              <span className="text-muted-foreground/30">•</span>
              <span className="text-xs font-medium text-accent">
                {review.property_name || `Property #${review.property}`}
              </span>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5 shrink-0 bg-accent/5 px-2 py-1 rounded-full">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < review.rating ? "fill-accent text-accent" : "text-muted/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Comment Section with "Read More" logic */}
        <div className="mt-3">
          <p
            className={`text-sm text-muted-foreground leading-relaxed ${
              !isExpanded && "line-clamp-3"
            }`}
          >
            {review.comment}
          </p>
          {review.comment.length > 180 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xs font-medium text-accent hover:underline"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Footer: Date and Actions */}
        <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
            {new Date(review.created_at).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => onEdit(review)}
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
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