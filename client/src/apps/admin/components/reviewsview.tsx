import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { PropertyReview, ReviewPayload } from "@/types/property";
import ReviewCard from "./reviews/reviewcard";
import ReviewFormDialog from "./reviews/reviewform";
import DeleteConfirmDialog from "./reviews/deleteconfirm";

const SAMPLE: PropertyReview[] = [
  {
    id: 1,
    property: 101,
    property_name: "Savanna Lodge",
    user: 1,
    reviewer_name: "Alice Mwangi",
    rating: 5,
    comment:
      "Absolutely breathtaking views and excellent service. Would visit again without hesitation.",
    avatar: "",
    country: "Kenya",
    created_at: "2026-01-15T10:30:00Z",
  },
  {
    id: 2,
    property: 102,
    property_name: "Riverside Camp",
    user: 2,
    reviewer_name: "James Oduor",
    rating: 4,
    comment:
      "Great location near the river. The staff were friendly and accommodating.",
    avatar: "",
    country: "Tanzania",
    created_at: "2026-02-01T14:00:00Z",
  },
];

let nextId = 10;

export default function ReviewsView() {
  const [reviews, setReviews] = useState<PropertyReview[]>(SAMPLE);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<PropertyReview | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = reviews.filter(
    (r) =>
      r.reviewer_name.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase()) ||
      r.country.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (payload: ReviewPayload) => {
    const avatarUrl =
      payload.avatar instanceof File
        ? URL.createObjectURL(payload.avatar)
        : payload.avatar;

    if (editing) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editing.id ? { ...r, ...payload, avatar: avatarUrl } : r,
        ),
      );
      toast.success("Review updated");
    } else {
      const newReview: PropertyReview = {
        ...payload,
        avatar: avatarUrl,
        id: nextId++,
        property_name: `Property #${payload.property}`,
        created_at: new Date().toISOString(),
      };
      setReviews((prev) => [newReview, ...prev]);
      toast.success("Review created");
    }
    setFormOpen(false);
    setEditing(null);
  };

  const handleEdit = (r: PropertyReview) => {
    setEditing(r);
    setFormOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setReviews((prev) => prev.filter((r) => r.id !== deleteId));
      toast.success("Review deleted");
      setDeleteId(null);
    }
  };

  return (
    <div>
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
          >
            <Plus className="mr-1.5 h-4 w-4" /> Add Review
          </Button>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
            No reviews found
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                onEdit={handleEdit}
                onDelete={setDeleteId}
              />
            ))}
          </div>
        )}
      </div>

      <ReviewFormDialog
        open={formOpen}
        onOpenChange={(o) => {
          setFormOpen(o);
          if (!o) setEditing(null);
        }}
        review={editing}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteId !== null}
        onOpenChange={(o) => {
          if (!o) setDeleteId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
