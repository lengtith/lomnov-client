

// //=================This is new code ===============================

// import { Schema, model } from "mongoose";
// import { Property, LocalizedContent } from "@/src/utils/types/indext";

// // ==================================================================
// // Define the PropertyDocument interface that includes timestamps
// interface PropertyDocument {
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Extend Property to include views
// interface PropertyWithViews extends Property {
//   views: number; // Tracks the total number of views
// }

// const LocalizedContentSchema = new Schema<LocalizedContent>({
//   content: { type: String },
//   language: { type: String },
// });

// const DetailSchema = new Schema({
//   language: { type: String, required: true },
//   content: { type: Map, of: String, required: true }, // Flexible key-value pairs
// });


// const PropertySchema = new Schema<PropertyWithViews>(
//   {
//     cognitoSub: { type: String || undefined , required: true },
//     title: { type: [LocalizedContentSchema], required: true },
//     description: { type: [LocalizedContentSchema], required: true },
//     thumbnail: { type: String, required: true },
//     images: { type: [String], required: true },
//     urlmap: { type: String },
//     address: { type: [LocalizedContentSchema], required: true },
//     location: { type: [LocalizedContentSchema], required: true },
//     price: { type: Number },
//     category: { type: [LocalizedContentSchema], required: true },
//     transition: { type: [LocalizedContentSchema], required: true },
//     detail: { type: [DetailSchema], required: true }, // Array of detail objects with flexible content
//     status: { type: Boolean, default: true },
    
//     views: { type: Number, default: 0 }, // Initialize views to 0
//   },
//   { timestamps: true }
// );

// // Add a pre-save middleware to adjust timestamps
// PropertySchema.pre<PropertyDocument>("save", function (next) {
//   const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
//   // Adjust createdAt and updatedAt fields
//   this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
//   this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
//   next();
// });

// // Static method to increment views
// PropertySchema.statics.incrementViews = async function (propertyId: string) {
//   return this.findByIdAndUpdate(
//     propertyId,
//     { $inc: { views: 1 } },
//     { new: true } // Return the updated document
//   );
// };

// // Export the updated Property model
// export const PropertyModel = model<PropertyWithViews>("Property", PropertySchema);

// import { Schema, model } from "mongoose";
// import { Property, LocalizedContent } from "@/src/utils/types/indext";

// // ==================================================================
// // Define the PropertyDocument interface that includes timestamps
// interface PropertyDocument {
//   createdAt: Date;
//   updatedAt: Date;
// }

// // Extend Property to include views and coordinates
// interface PropertyWithViews extends Property {
//   views: number; // Tracks the total number of views
//   coordinate: { type: string; coordinates: number[] }; // GeoJSON format for location
// }

// const LocalizedContentSchema = new Schema<LocalizedContent>({
//   content: { type: String },
//   language: { type: String },
// });

// const DetailSchema = new Schema({
//   language: { type: String, required: true },
//   content: { type: Map, of: String, required: true }, // Flexible key-value pairs
// });

// const PropertySchema = new Schema<PropertyWithViews>(
//   {
//     cognitoSub: { type: String || undefined, required: true },
//     title: { type: [LocalizedContentSchema], required: true },
//     description: { type: [LocalizedContentSchema], required: true },
//     thumbnail: { type: String, required: true },
//     images: { type: [String], required: true },
//     urlmap: { type: String },
//     address: { type: [LocalizedContentSchema], required: true },
//     location: { type: [LocalizedContentSchema], required: true },
//     price: { type: Number },
//     category: { type: [LocalizedContentSchema], required: true },
//     transition: { type: [LocalizedContentSchema], required: true },
//     detail: { type: [DetailSchema], required: true }, // Array of detail objects with flexible content
//     status: { type: Boolean, default: true },

//     views: { type: Number, default: 0 }, // Initialize views to 0

//     // Add the new coordinate field for GeoJSON
//     coordinate: {
//       type: { type: String, enum: ["Point"], required: true }, // Specify type as "Point"
//       coordinates: { type: [Number], required: true }, // Longitude, Latitude array
//     },
//   },
//   { timestamps: true }
// );

// // Add a pre-save middleware to adjust timestamps
// PropertySchema.pre<PropertyDocument>("save", function (next) {
//   const timezoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
//   // Adjust createdAt and updatedAt fields
//   this.createdAt = new Date(this.createdAt.getTime() + timezoneOffset);
//   this.updatedAt = new Date(this.updatedAt.getTime() + timezoneOffset);
//   next();
// });

// // Static method to increment views
// PropertySchema.statics.incrementViews = async function (propertyId: string) {
//   return this.findByIdAndUpdate(
//     propertyId,
//     { $inc: { views: 1 } },
//     { new: true } // Return the updated document
//   );
// };

// // Export the updated Property model
// export const PropertyModel = model<PropertyWithViews>("Property", PropertySchema);

import { Schema, model } from "mongoose";
import { Property, LocalizedContent } from "@/src/utils/types/indext";

// ==================================================================


// Extend Property to include views and coordinates
interface PropertyWithViews extends Property {
  views: number; // Tracks the total number of views
  coordinate: { type: string; coordinates: number[] }; // GeoJSON format for location
}

const LocalizedContentSchema = new Schema<LocalizedContent>({
  content: { type: String },
  language: { type: String },
});


const DetailSchema = new Schema({
  language: { type: String, required: true },
  content: { type: Map, of: String, required: true }, // Flexible key-value pairs
});

const PropertySchema = new Schema<PropertyWithViews>(
  {
    cognitoSub: { type: String, required: true },
    title: { type: [LocalizedContentSchema], required: true },
    description: { type: [LocalizedContentSchema], required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    urlmap: { type: String },
    address: { type: [LocalizedContentSchema], required: true },
    location: { type: [LocalizedContentSchema], required: true },
    price: { type: Number },
    category: { type: [LocalizedContentSchema], required: true },
    transition: { type: [LocalizedContentSchema], required: true },
    detail: { type: [DetailSchema], required: true }, // Array of detail objects with flexible content
    status: { type: Boolean, default: true },
    views: { type: Number, default: 0 }, // Initialize views to 0

    // Add the new coordinate field for GeoJSON
    coordinate: {
      type: { type: String, enum: ["Point"], required: true }, // Specify type as "Point"
      coordinates: { type: [Number], required: true }, // Longitude, Latitude array
    },
  },
  { timestamps: true }
);

// Add a geospatial index to the coordinate field
PropertySchema.index({ coordinate: "2dsphere" }); // This will enable geospatial queries like near searches

// Static method to increment views
PropertySchema.statics.incrementViews = async function (propertyId: string) {
  try {
    const updatedProperty = await this.findByIdAndUpdate(
      propertyId,
      { $inc: { views: 1 } },
      { new: true } // Return the updated document
    );
    return updatedProperty;
  } catch (error) {
    throw new Error("Failed to increment views for property");
  }
};

// Export the updated Property model
export const PropertyModel = model<PropertyWithViews>("Property", PropertySchema);
