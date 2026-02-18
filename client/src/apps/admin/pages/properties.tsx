import PropertiesView from "@/apps/admin/components/property/propertyview";
import LoadingScreen from "@/components/loadingscreen";
import { useDeleteProperty, useProperties } from "@/services/property.service";
import { useState } from "react";

export default function Properties() {
  const { data, isLoading, refetch } = useProperties();
  const { mutateAsync } = useDeleteProperty();

  const [deletingProperty, setDeletingProperty] = useState<string | null>(null);

  if (isLoading) return <LoadingScreen />;

  const handleDelete = async (slug?: string) => {
    if (!slug) return;
    setDeletingProperty(slug);
    try {
      await mutateAsync(slug);
      await refetch();
    } finally {
      setDeletingProperty(null);
    }
  };

  return (
    <div className="min-h-screen bg-background mt-15">
      <div className="container py-8 px-6">
        <PropertiesView
          properties={data?.results ?? []}
          onDelete={handleDelete}
          deletingProperty={deletingProperty}
        />
      </div>
    </div>
  );
}
