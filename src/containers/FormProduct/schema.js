import * as Yup from 'yup';

export const schemaProduct = Yup.object().shape({
  productName: Yup.string().required(),
  description: Yup.string(),
  category: Yup.string().required(),
  quantity: Yup.string().required(),
  price: Yup.number().required().min(1),
  variants: Yup.object().shape({
    color: Yup.string().required(),
    size: Yup.array().required(),
    images: Yup.object().shape({
        front: Yup.string().required,
        back: Yup.string().required,
        other: Yup.string()
    })
  })
})