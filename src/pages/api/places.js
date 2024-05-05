import { mw } from "@/api/mw";
import { createPlace, readPlaces } from "@/db/crud";

const handle = mw(async (req, res) => {
  if (req.method === "GET") {
    const places = await readPlaces();

    res.send(places);

    return;
  }

  if (req.method === "POST") {
    console.log("req body", req.body);
    const place = req.body;

    const newPlace = await createPlace(place);

    res.send(newPlace);

    return;
  }

  res.status(404).send({ error: "Not found" });
});

export default handle;
