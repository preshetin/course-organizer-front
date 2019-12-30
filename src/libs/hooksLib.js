import { useState } from "react"


export const useFormFields = (initialValues) => {
  const [fields, setFields] = useState(initialValues)

  return [
    fields,
    event => {
      setFields({
        ...fields,
        [event.target.id]: event.target.value
      })
    }
  ]
}
