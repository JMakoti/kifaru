import { useMemo, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { PropertyReview, ReviewPayload } from "@/types/property";
import ReviewCard from "./reviews/reviewcard";
import ReviewFormDialog from "./reviews/reviewform";
import DeleteConfirmDialog from "./reviews/deleteconfirm";
import { useReviews } from "@/services/property.service";

export default function ReviewsView() {
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PropertyReview | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { useGetReviews, useCreateReview, useUpdateReview, useDeleteReview } =
    useReviews();
  // Queries & Mutations
  const { data, isLoading, refetch } = useGetReviews();
  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();
  const deleteMutation = useDeleteReview();

  const reviewList = useMemo(() => data?.results || [], [data]);

  const filtered = reviewList.filter(
    (r) =>
      r.reviewer_name.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.country.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (payload: ReviewPayload) => {
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, payload },
        {
          onSuccess: () => {
            toast.success("Review updated");
            setFormOpen(false);
            refetch();
          },
          onError: () => toast.error("Failed to update review"),
        },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Review created");
          setFormOpen(false);
          refetch();
        },
        onError: () => toast.error("Failed to create review"),
      });
    }
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => {
          toast.success("Review deleted");
          setDeleteId(null);
          refetch();
        },
      });
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reviews
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage guest reviews and feedback
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reviews…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          disabled={isLoading}
        >
          <Plus className="mr-1.5 h-4 w-4" /> Add Review
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
          No reviews found
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              onEdit={(review) => {
                setEditing(review);
                setFormOpen(true);
              }}
              onDelete={setDeleteId}
            />
          ))}
        </div>
      )}

      <ReviewFormDialog
        open={formOpen}
        onOpenChange={(o) => {
          setFormOpen(o);
          if (!o) setEditing(null);
        }}
        review={editing}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteConfirmDialog
        open={deleteId !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteId(null);
        }}
        onConfirm={confirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
