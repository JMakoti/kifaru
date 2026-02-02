"use client";

import { useMemo, useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { PropertyImage } from "@/services/property.types";
import { Sheet, SheetContent } from "@/components/ui/sheet";

type TabType =
  | "all"
  | "bedroom"
  | "kitchen"
  | "living_room"
  | "dining"
  | "garden"
  | "outdoor"
  | "bathroom"
  | "other";

interface Tab {
  id: TabType;
  label: string;
  count: number;
}

interface PhotoGalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: PropertyImage[];
}

export function PhotoGalleryModal({
  open,
  onOpenChange,
  photos,
}: PhotoGalleryModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  // Prepare tabs with counts
  const tabs: Tab[] = useMemo(() => {
    const countByCategory = (category: TabType) =>
      category === "all"
        ? photos.length
        : photos.filter((p) => p.category === category).length;

    return [
      { id: "all", label: "All photos", count: countByCategory("all") },
      { id: "bedroom", label: "Bedrooms", count: countByCategory("bedroom") },
      { id: "kitchen", label: "Kitchen", count: countByCategory("kitchen") },
      {
        id: "living_room",
        label: "Living area",
        count: countByCategory("living_room"),
      },
      { id: "dining", label: "Dining", count: countByCategory("dining") },
      { id: "bathroom", label: "Bathroom", count: countByCategory("bathroom") },
      { id: "garden", label: "Garden", count: countByCategory("garden") },
      { id: "outdoor", label: "Outdoor", count: countByCategory("outdoor") },
      { id: "other", label: "Other", count: countByCategory("other") },
    ];
  }, [photos]);

  // Filter photos based on active tab
  const filteredPhotos = useMemo(() => {
    if (activeTab === "all") return photos;
    return photos.filter((photo) => photo.category === activeTab);
  }, [activeTab, photos]);

  const currentTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label ?? "All photos";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="
    w-screen
    md:w-[85vw]
    xl:w-[75vw]
    max-w-none
    p-0
    flex flex-col
    [&_[data-radix-sheet-close]]:hidden
  "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <button
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Photo gallery
          </button>

          <Button
            className="rounded-full px-5 cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Return to property
          </Button>
        </div>

        {/* Tabs */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeTab === tab.id
                    ? "bg-primary text-background border-primary"
                    : "bg-background border-border hover:border-primary/40"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <h2 className="text-2xl font-semibold mb-6">{currentTabLabel}</h2>

          {filteredPhotos.length === 0 ? (
            <p className="text-muted-foreground">
              No photos available for this category.
            </p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filteredPhotos.map((photo, index) => {
                const mobileWidth = index % 2 === 0 ? "w-[320px]" : "w-[320px]";

                const desktopWidth =
                  index % 3 === 0 ? "md:w-[550px]" : "md:w-[350px]";

                return (
                  <div
                    key={photo.id}
                    className={`rounded-lg overflow-hidden group cursor-pointer ${mobileWidth} ${desktopWidth}`}
                  >
                    <div className="w-full h-[180px] sm:h-[200px] md:h-[240px] lg:h-[280px] overflow-hidden rounded-lg">
                      <img
                        src={photo.image}
                        alt={photo.category ?? "Property photo"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {photo.category && (
                      <p className="mt-2 text-sm font-medium text-foreground/90 capitalize">
                        {photo.category.replace("_", " ")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
