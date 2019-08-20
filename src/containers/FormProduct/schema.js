import * as Yup from "yup";

export const schemaProduct = {
  productName: Yup.string().required(),
  description: Yup.string(),
  category: Yup.string().required(),
  quantity: Yup.string().required(),
  price: Yup.number().required().min(1),
  variants: Yup.object().shape(
    Yup.object().shape({
      color: Yup.string().required,
      sizes: Yup.object().required,
      images: Yup.object().shape(
        Yup.object().shape({
          front: Yup.string().required,
          back: Yup.string().required,
          other: Yup.string()
        })
      )
    })
  )
}
  // images: Yup.array().of(
  //   Yup.object().shape({
  //   front: Yup.string().required,
  //   back: Yup.string().required,
  //   other: Yup.string()
  // })),
  // variants: Yup.array().of(
  //   Yup.object().shape({
  //     color: Yup.string().required(),
  //     size: Yup.array().required(),
  //   })
  // )