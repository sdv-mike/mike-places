import mongoose from "mongoose";
import { placeSchema } from "../schemas/PlaceSchema";

export const PlaceModel =
  mongoose.models.Place || mongoose.model("Place", placeSchema);
