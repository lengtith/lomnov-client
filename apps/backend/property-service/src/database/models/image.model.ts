import mongoose, { Document, Schema } from 'mongoose';

export interface IImage extends Document {
    url: string; // URL of the uploaded image
}

const imageSchema: Schema = new Schema({
    url: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Optionally, this adds createdAt and updatedAt timestamps

const Image = mongoose.model<IImage>('Image', imageSchema);

export default Image;
