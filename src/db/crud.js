import { PlaceModel } from "./models/PlaceModel.js";

export const createPlace = async (place) => {
  const newPlace = new PlaceModel(place);
  console.log("newPlace", newPlace);

  await newPlace.save();

  return newPlace;
};

export const readPlaces = async () => {
  return await PlaceModel.find();
};

export const readPlace = async (placeId) => {
  return await PlaceModel.findById(placeId);
};

export const updatePlace = async (
  placeId,
  { type, name, address, city, postalCode, country, specifics }
) => {
  const input = {
    type,
    name,
    address,
    city,
    postalCode,
    country,
    specifics,
  };

  const updatedPlace = await PlaceModel.findByIdAndUpdate(placeId, input, {
    returnDocument: "after",
  });

  return updatedPlace;
};

export const deletePlace = async (placeId) => {
  const place = await PlaceModel.findOneAndDelete({ _id: placeId });

  if (!place) {
    return null;
  }

  return place;
};
