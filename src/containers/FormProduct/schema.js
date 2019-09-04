import * as Yup from "yup";
import mapValues from "lodash/mapValues";

export const schemaProduct = Yup.object().shape({
  productName: Yup.string().required("Must be filled"),
  description: Yup.string("Must be filled"),
  category: Yup.string().required("Must be filled"),
  //quantity: Yup.number().required(),
  price: Yup.number()
    .required("Must be filled bigger than 1")
    .min(1),
  variants: Yup.lazy(obj =>
    Yup.object(
      mapValues(obj, () =>
        Yup.object().shape({
          color: Yup.string().required("Must be filled"),
          sizes: Yup.array().required("Must be filled"),
          images: Yup.object({
            front: Yup.string().required("Must be filled"),
            back: Yup.string().required("Must be filled"),
            other: Yup.string()
          })
        })
      )
    ).required("Must be filled")
  )
});
