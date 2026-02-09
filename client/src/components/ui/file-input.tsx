import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";

interface FileInputProps {
  id?: string;
  value: File | string | null;
  onChange: (file: File | string | null) => void;
  accept?: string;
  placeholder?: string;
  className?: string;
  showPreview?: boolean;
  fileOnly?: boolean;
}

export function FileInput({
  id,
  value,
  onChange,
  accept = "image/*",
  placeholder = "Choose file or enter URL",
  className,
  showPreview = true,
  fileOnly = false,
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [urlMode, setUrlMode] = React.useState(typeof value === "string" && value !== "");
  const [urlValue, setUrlValue] = React.useState(typeof value === "string" ? value : "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      setUrlMode(false);
      setUrlValue("");
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrlValue(url);
    onChange(url || null);
  };

  const handleClear = () => {
    onChange(null);
    setUrlValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const previewUrl = React.useMemo(() => {
    if (value instanceof File) {
      return URL.createObjectURL(value);
    }
    if (typeof value === "string" && value) {
      return value;
    }
    return null;
  }, [value]);

  React.useEffect(() => {
    return () => {
      if (value instanceof File && previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [value, previewUrl]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        {/* File Upload Button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex-shrink-0",
            !urlMode && value && "border-primary/50 bg-primary/5"
          )}
        >
          <Upload className="w-4 h-4 mr-2" />
          {value instanceof File ? value.name : "Choose File"}
        </Button>

        {/* URL Input — only shown if not fileOnly */}
        {!fileOnly && (
          <div className="relative flex-1">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={placeholder}
              value={urlValue}
              onChange={handleUrlChange}
              onFocus={() => setUrlMode(true)}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
            />
          </div>
        )}

        {/* Clear Button */}
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="flex-shrink-0 text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview */}
      {showPreview && previewUrl && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border/50 bg-muted/30">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {value instanceof File && (
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-muted-foreground">
              {value.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
