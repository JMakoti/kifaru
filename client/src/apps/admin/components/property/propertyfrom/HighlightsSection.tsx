// import { Plus, X, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { FormField } from "./FormField";
// import { FormSection } from "./FormSection";
// import type { Highlight } from "@/types/property";

// interface HighlightsSectionProps {
//   highlights: Highlight[];
//   onChange: (highlights: Highlight[]) => void;
// }

// export function HighlightsSection({ highlights, onChange }: HighlightsSectionProps) {
//   const addHighlight = () => {
//     onChange([...highlights, { text: "" }]);
//   };

//   const removeHighlight = (index: number) => {
//     onChange(highlights.filter((_, i) => i !== index));
//   };

//   const updateHighlight = (index: number, value: string) => {
//     const updated = [...highlights];
//     updated[index] = { text: value };
//     onChange(updated);
//   };

//   return (
//     <FormSection 
//       title="Property Highlights" 
//       description="Add key selling points and highlights for your property"
//     >
//       <div className="space-y-3">
//         {highlights.map((highlight, index) => (
//           <div 
//             key={index} 
//             className="group relative flex items-center gap-3 animate-scale-in"
//           >
//             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
//               <Star className="w-4 h-4 text-muted-foreground" />
//             </div>
            
//             <FormField label="" htmlFor={`highlight-${index}`} className="flex-1 mb-0">
//               <Input
//                 id={`highlight-${index}`}
//                 placeholder="e.g., Ocean views from every room"
//                 value={highlight.text}
//                 onChange={(e) => updateHighlight(index, e.target.value)}
//               />
//             </FormField>
            
//             <button
//               type="button"
//               onClick={() => removeHighlight(index)}
//               className="flex-shrink-0 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
        
//         <Button
//           type="button"
//           variant="outline"
//           onClick={addHighlight}
//           className="w-full border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add Highlight
//         </Button>
//       </div>
//     </FormSection>
//   );
// }
