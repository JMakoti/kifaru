import { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { GalleryPhoto } from "@/services/property.types";

type TabType = "all" | "bedrooms" | "kitchen" | "living" | "dining";

interface Tab {
  id: TabType;
  label: string;
  count: number;
}

interface PhotoGalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: GalleryPhoto[];
}

export function PhotoGalleryModal({
  open,
  onOpenChange,
  photos,
}: PhotoGalleryModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const tabs: Tab[] = useMemo(() => {
    const countByCategory = (category: TabType) =>
      category === "all"
        ? photos.length
        : photos.filter((p) => p.category === category).length;

    return [
      { id: "all", label: "All photos", count: countByCategory("all") },
      { id: "bedrooms", label: "Bedrooms", count: countByCategory("bedrooms") },
      { id: "kitchen", label: "Kitchen", count: countByCategory("kitchen") },
      { id: "living", label: "Living area", count: countByCategory("living") },
      { id: "dining", label: "Dining", count: countByCategory("dining") },
    ];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeTab === "all") return photos;
    return photos.filter((photo) => photo.category === activeTab);
  }, [activeTab, photos]);

  const currentTabLabel =
    tabs.find((tab) => tab.id === activeTab)?.label ?? "All photos";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-6xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col"
      >
        {/* <DialogContent
        showCloseButton={false}
        className="max-w-[1200px] w-full h-[95vh] p-0 flex flex-col overflow-hidden bg-background text-foreground"
      > */}
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <button
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Photo gallery
          </button>

          <Button
            className="rounded-full px-5"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPhotos.map((photo) => (
                <div key={photo.id} className="group w-full">
                  <div className="w-full overflow-hidden rounded-lg">
                    <img
                      src={photo.src}
                      alt={photo.label ?? "Property photo"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {photo.label && (
                    <p className="mt-2 text-sm font-medium text-foreground/90">
                      {photo.label}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
