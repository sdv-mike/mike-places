import { Schema } from "mongoose";

export const placeSchema = new Schema({
  type: { type: String, required: true, enum: ["Restaurant", "Musée", "Bar", "Parc"] },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  specificType: { type: String, required: false },
  stars: { type: Number, min: 1, max: 3, required: false },
  averagePrice: { type: Number, min: 1, max: 5, required: false },
  artMovement: { type: String, required: false },
  artType: { type: String, required: false },
  isFree: { type: String, required: false, enum: ["Gratuit", "Payant"] },
  price: { type: Number, required: false },
});
