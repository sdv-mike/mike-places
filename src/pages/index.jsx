import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async () => {
  const response = await axios("http://localhost:3000/api/places");
  const places = response.data;

  return {
    props: { initialPlaces: places || [] },
  };
};

const HomePage = ({ initialPlaces }) => {
  const [places, setPlaces] = useState(initialPlaces);

  return (
    <ul className="flex flex-col gap-4">
      {places.map(({ _id, name, type }) => (
        <li key={_id} className="group flex items-center gap-2">
          <Link href={`/places/${_id}`}>
            <span
              className={clsx("h-6 w-6 border", {
                "border-green-500": type === "Restaurant",
                "border-blue-500": type === "Musée",
                "border-red-500": type === "Bar",
                "border-yellow-500": type === "Parc",
              })}
            />
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HomePage;
