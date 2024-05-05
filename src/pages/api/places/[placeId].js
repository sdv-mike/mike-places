import { mw } from "@/api/mw";
import { deletePlace, readPlace, updatePlace } from "@/db/crud";

const handle = mw(async (req, res) => {
  const { placeId } = req.query;


  if (req.method === "GET") {
    const place = await readPlace(placeId);

    if (!place) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(place);

    return;
  }

  if (req.method === "PATCH") {
    console.log("req.body", req.body);
    const updatedData = req.body;

    const updatedPlace = await updatePlace(placeId, updatedData);

    if (!updatedPlace) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(updatedPlace);

    return;
  }

  if (req.method === "DELETE") {
    const placeToDelete = await deletePlace(placeId);

    if (!placeToDelete) {
      res.status(404).send({ error: "Not found" });

      return;
    }

    res.send(placeToDelete);

    return;
  }

  res.status(404).send({ error: "Not found" });
});

export default handle;
