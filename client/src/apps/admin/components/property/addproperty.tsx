// "use client";

// import { useState } from "react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";

// export default function PropertyFormSheet() {
//   const [open, setOpen] = useState(false);
//   const steps = [
//     "basic",
//     "details",
//     "pricing",
//     "media",
//     "timestamps",
//     "amenities",
//     "highlights",
//     "images",
//     "pricingOptions",
//     "features",
//     "contacts",
//   ];

//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState<any>({}); // You can type this later

//   const nextStep = () => {
//     if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
//   };
//   const prevStep = () => {
//     if (currentStep > 0) setCurrentStep(currentStep - 1);
//   };

//   return (
//     <>
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetTrigger asChild>
//           <Button>Add Property</Button>
//         </SheetTrigger>

//         <SheetContent className="overflow-y-auto p-6 max-w-4xl">
//           <h2 className="text-2xl font-bold mb-6">Add / Edit Property</h2>

//           <Tabs value={steps[currentStep]} className="w-full">
//             {/* Visible Tabs */}
//             <div className="overflow-x-auto mb-6">
//               <TabsList className="grid grid-flow-col auto-cols-max gap-2">
//                 <TabsTrigger value="basic">Basic Info</TabsTrigger>
//                 <TabsTrigger value="details">Property Details</TabsTrigger>
//                 <TabsTrigger value="pricing">Pricing & Booking</TabsTrigger>
//                 <TabsTrigger value="media">Media</TabsTrigger>
//                 <TabsTrigger value="timestamps">Timestamps</TabsTrigger>
//                 <TabsTrigger value="amenities">Amenities</TabsTrigger>
//                 <TabsTrigger value="highlights">Highlights</TabsTrigger>
//                 <TabsTrigger value="images">Property Images</TabsTrigger>
//                 <TabsTrigger value="pricingOptions">Pricing Options</TabsTrigger>
//                 <TabsTrigger value="features">Features</TabsTrigger>
//                 <TabsTrigger value="contacts">Contacts</TabsTrigger>
//               </TabsList>
//             </div>

//             {/* Step Contents */}
//             {/* Basic Info */}
//             <TabsContent value="basic" className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Property Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="e.g., Oceanfront Beach Villa"
//                   value={formData.name || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="slug">Slug</Label>
//                 <Input
//                   id="slug"
//                   placeholder="Enter property slug"
//                   value={formData.slug || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, slug: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Enter description"
//                   value={formData.description || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, description: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="location">Location</Label>
//                 <Input
//                   id="location"
//                   placeholder="City, Country"
//                   value={formData.location || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, location: e.target.value })
//                   }
//                 />
//               </div>
//             </TabsContent>

//             {/* Property Details */}
//             <TabsContent value="details" className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="category">Category</Label>
//                 <Input
//                   id="category"
//                   placeholder="urban, beachfront, coworking..."
//                   value={formData.category || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, category: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="bedrooms">Bedrooms</Label>
//                   <Input
//                     id="bedrooms"
//                     type="number"
//                     placeholder="Number of bedrooms"
//                     value={formData.bedrooms || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, bedrooms: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="bathrooms">Bathrooms</Label>
//                   <Input
//                     id="bathrooms"
//                     type="number"
//                     placeholder="Number of bathrooms"
//                     value={formData.bathrooms || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, bathrooms: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="maxGuests">Max Guests</Label>
//                   <Input
//                     id="maxGuests"
//                     type="number"
//                     placeholder="Maximum guests allowed"
//                     value={formData.maxGuests || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, maxGuests: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="price">Base Price</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   placeholder="Base price per night"
//                   value={formData.price || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, price: e.target.value })
//                   }
//                 />
//               </div>
//             </TabsContent>

//             {/* Pricing & Booking */}
//             <TabsContent value="pricing" className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="minNights">Minimum Nights</Label>
//                   <Input
//                     id="minNights"
//                     type="number"
//                     placeholder="Minimum stay nights"
//                     value={formData.minNights || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, minNights: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="prepayment">Prepayment %</Label>
//                   <Input
//                     id="prepayment"
//                     type="number"
//                     placeholder="50%"
//                     value={formData.prepayment || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, prepayment: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="cancellation">Cancellation Days</Label>
//                   <Input
//                     id="cancellation"
//                     type="number"
//                     placeholder="30"
//                     value={formData.cancellation || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, cancellation: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="checkIn">Check-in Time</Label>
//                   <Input
//                     id="checkIn"
//                     type="time"
//                     value={formData.checkIn || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, checkIn: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="checkOut">Check-out Time</Label>
//                   <Input
//                     id="checkOut"
//                     type="time"
//                     value={formData.checkOut || ""}
//                     onChange={(e) =>
//                       setFormData({ ...formData, checkOut: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Additional Tabs */}
//             {/* Media, Timestamps, Amenities, Highlights, Images, PricingOptions, Features, Contacts */}
//             {/* You can repeat the same style: grid, space-y-2, and proper spacing */}

//           </Tabs>

//           {/* Navigation Buttons */}
//           <div className="mt-6 flex justify-between">
//             <Button
//               variant="outline"
//               onClick={prevStep}
//               disabled={currentStep === 0}
//             >
//               Back
//             </Button>
//             {currentStep < steps.length - 1 ? (
//               <Button onClick={nextStep}>Next</Button>
//             ) : (
//               <Button type="submit">Save Property</Button>
//             )}
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }
