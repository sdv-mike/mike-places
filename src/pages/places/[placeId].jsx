import { Button } from "@/components/Button";
import axios from "axios";
import Link from "next/link";

export const getServerSideProps = async ({ params }) => {
  const response = await axios(
    `http://localhost:3000/api/places/${params.placeId}`
  );
  const place = response.data;

  return {
    props: { initialPlace: place },
  };
};
const PlacePage = ({ initialPlace }) => {
  const handleDelete = async (placeId) => {
    await axios.delete(`http://localhost:3000/api/places/${placeId}`);
    window.location.href = "/";
  };

  return (
    <div>
      <div>
        <Link href={`/places/${initialPlace._id}/edit`}>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant="danger" onClick={() => handleDelete(initialPlace._id)}>
          Delete
        </Button>
      </div>
      <h1>{initialPlace.name}</h1>
      <p>{initialPlace.type}</p>
      <p>{initialPlace.country}</p>
      <p>{initialPlace.city}</p>
      <p>{initialPlace.address}</p>
      <p>{initialPlace.postalCode}</p>
    </div>
  );
};

export default PlacePage;
