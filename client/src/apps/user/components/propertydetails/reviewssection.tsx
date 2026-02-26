"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import type { PropertyReview } from "@/types/property";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewsSectionProps {
  reviews: PropertyReview[];
}

const formatDate = (dateString?: string) => {
  if (!dateString) return "TBD";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "TBD";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {

  const [page, setPage] = useState(0);
  const { ref, isInView } = useInView();
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, (page + 1) * perPage);

  if (!reviews || reviews.length === 0) return null;
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-medium tracking-widest uppercase text-gray-500">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl text-gray-900 mt-3">
            Guest Reviews
          </h2>
        </div>

        {/* Reviews Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {visible.map((r) => (
            <div
              key={r.reviewer_name}
              className="flex flex-col p-6 bg-white border border-gray-200"
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-4 mb-5">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={r.avatar} alt={r.reviewer_name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {r.reviewer_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-md text-gray-900">
                    {r.reviewer_name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(r.created_at)}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-lg text-gray-500 leading-relaxed flex-1">
                "{r.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
