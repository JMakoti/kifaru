import { useState, useMemo } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import type { PropertyReview } from "@/services/property.types";
import { useReviews } from "@/services/property.service";
import LoadingScreen from "@/components/loadingscreen";

interface ReviewsProps {
  propertyId: number;
}

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date:Date;
  verified: boolean;
  avatar?: string;
}

const StarRating = ({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) => {
  const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const mapApiReviewsToUI = (
  reviews: PropertyReview[],
  propertyId: number
): ReviewItem[] =>
  reviews
    .filter((r) => r.property === propertyId)
    .map((r) => ({
      id: String(r.id),
      author: r.reviewer_name,
      rating: r.rating,
      comment: r.comment,
      date: r.created_at,
      verified: r.rating >= 4,
      avatar: r.avatar,
    }))
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

export default function Reviews({ propertyId }: ReviewsProps) {
  const { data = [], isLoading } = useReviews();
  const [visibleReviews, setVisibleReviews] = useState(3);

  const reviews = useMemo(
    () => mapApiReviewsToUI(data, propertyId),
    [data, propertyId]
  );

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return {
      stars,
      count,
      percentage: totalReviews ? (count / totalReviews) * 100 : 0,
    };
  });

  const displayedReviews = reviews.slice(0, visibleReviews);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-8">
      {totalReviews === 0 ? (
        <div className="text-center py-12 mt-20">
          <p className="text-foreground">
            No reviews yet. Be the first to review!
          </p>
        </div>
      ) : (
        <>
          {/* Rating Summary */}
          <div className="bg-secondary/30 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Overall Rating */}
              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div>
                    <div className="text-5xl font-bold p-5">
                      {averageRating}
                    </div>
                    <StarRating
                      rating={Math.round(Number(averageRating))}
                      size="lg"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on {totalReviews} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12">
                      {stars} stars
                    </span>
                    <Progress value={percentage} className="h-2 flex-1" />
                    <span className="text-sm text-muted-foreground w-8">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guest Reviews */}
          <h3 className="text-xl font-semibold">Guest Reviews</h3>

          {/* Reviews List */}
          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-border pb-6 last:border-0"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={review.avatar} alt={review.author} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{review.author}</h4>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          Verified Stay
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <StarRating rating={review.rating} />
                      <span>•</span>
                      <span>
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Load More / Less */}
          {totalReviews > 3 && (
            <div className="text-center">
              {visibleReviews < totalReviews ? (
                <Button
                  variant="outline"
                  onClick={() => setVisibleReviews((v) => v + 3)}
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Load More Reviews
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setVisibleReviews((v) => v - 3)}
                >
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Load Less Reviews
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
