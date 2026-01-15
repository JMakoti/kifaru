import { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface ReviewItem {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
  response?: {
    author: string;
    date: string;
    text: string;
  };
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

export default function Reviews({ review }: { review: ReviewItem[] }) {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const totalReviews = review.length;
  const averageRating = (
    review.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: review.filter((r) => r.rating === stars).length,
    percentage:
      (review.filter((r) => r.rating === stars).length / totalReviews) * 100,
  }));

  const sortedReviews = review;

  const displayedReviews = sortedReviews.slice(0, visibleReviews);

  return (
    <div className="space-y-8">
      {/* Rating Summary */}

      {review.length === 0 ? (
        <div className="text-center py-12 mt-20">
          <p className="text-foreground">
            No reviews yet. Be the first to review!
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-secondary/30 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Overall Rating */}

              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div>
                    <div className="text-5xl font-bold">{averageRating}</div>

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-xl font-semibold">Guest Reviews</h3>
          </div>

          {/* Reviews List */}
          <div className="space-y-6 mt-4">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-border pb-6 last:border-0"
              >
                {/* Review Header */}
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
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-foreground mb-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Property Response */}
                {review.response && (
                  <div className="mt-4 ml-16 bg-muted/50 rounded-lg p-4 border-l-2 border-primary">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">
                        {review.response.author}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.response.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">
                      {review.response.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Load More Button */}
          {sortedReviews.length > 3 &&
            (visibleReviews < sortedReviews.length ? (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setVisibleReviews((prev) => prev + 3)}
                  className="min-w-[200px]"
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Load More Reviews
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setVisibleReviews((prev) => prev - 3)}
                  className="min-w-[200px]"
                >
                  <ChevronUp className="w-4 h-4 mr-2" />
                  Load Less Reviews
                </Button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
