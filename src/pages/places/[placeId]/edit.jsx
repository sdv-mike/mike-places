import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { FormField } from "@/components/FormField";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";


const validationSchema = yup.object({
  type: yup.string().required("Le type de lieu est obligatoire"),
  name: yup.string().required("Le nom du lieu est obligatoire"),
  address: yup.string().required("L'adresse est obligatoire"),
  city: yup.string().required("La ville est obligatoire"),
  postalCode: yup.string().required("Le code postal est obligatoire"),
  country: yup.string(),
  specificType: yup.string(),
  stars: yup.number(),
  averagePrice: yup.number(),
  artMovement: yup.string(),
  artType: yup.string(),
  isFree: yup.string(),
  price: yup.string()
});

export const getServerSideProps = async ({ params }) => {
  const response = await axios(
    `http://localhost:3000/api/places/${params.placeId}`
  );
  const place = response.data;

  return {
    props: { initialPlace: place },
  };
};

const PlaceFormPage = ({ initialPlace }) => {
  const handleSubmit = async (values, { resetForm }) => {
    await axios.patch(`http://localhost:3000/api/places/${values._id}`, values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialPlace}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values,errors }) => (
        <Form>
          <select
            name="type"
            label="Type de lieu"
            onChange={(e) => {
              values.type = e.target.value;
            }}
            className="border-2 focus:border-indigo-400 outline-none px-3 py-2"
          >
            <option value="">Choisissez un type de lieu</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Musée">Musée</option>
            <option value="Bar">Bar</option>
            <option value="Parc">Parc</option>
          </select>
          <FormField name="name" label="Nom du lieu" />
          <FormField name="address" label="Adresse" />
          <FormField name="city" label="Ville" />
          <FormField name="postalCode" label="Code postal" />
          <FormField name="country" label="Pays" />
          <select
            name="isFree"
            label="Gratuit ou payant"
            className="border-2 focus:border-indigo-400 outline-none px-3 py-2"
            onChange={(e) => {
              values.isFree = e.target.value;
            }}
          >
            <option value="">Gratuit ou payant</option>
            <option value="Gratuit">Gratuit</option>
            <option value="Payant">Payant</option>
          </select>
          {values.type === "Restaurant" && (
            <>
              <FormField name="specificType" label="Type de cuisine" />
              <FormField name="stars" type="number" label="Nombre d'étoiles" />
              <FormField
                name="averagePrice"
                type="number"
                label="Prix moyen (1-5)"
              />
            </>
          )}
          {values.type === "Musée" && (
            <>
              <FormField name="artMovement" label="Courant artistique" />
              <FormField name="artType" label="Type d'art" />
              {values.isFree === "Payant" && (
                <FormField name="price" type="number" label="Prix" />
              )}
            </>
          )}
          {values.type === "Bar" && (
            <>
              <FormField name="specificType" label="Type de bar" />
              <FormField
                name="averagePrice"
                type="number"
                label="Prix moyen (1-5)"
              />
            </>
          )}
          {values.type === "Parc" && (
            <>
              <FormField name="specificType" label="Type de parc" />
              {values.isFree === "Payant" && (
                <FormField name="price" type="number" label="Prix" />
              )}
            </>
          )}
          <Button type="submit" onClick = {()=>console.log(errors)}>Modifier</Button>
        </Form>
      )}
    </Formik>
  );
};

export default PlaceFormPage;
