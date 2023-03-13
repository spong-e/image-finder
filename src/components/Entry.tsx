import { FunctionComponent } from "react";
import { Button, TextField, Radio, RadioGroup } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

interface EntryProps {}

const validationSchema = yup.object({
  firstName: yup.string().required("Firstname is required"),
  surname: yup.string().required("Surname is required"),
  thumbnail: yup.string(),
});

enum Options {
  Option1,
  Option2,
  Option3,
}

const Entry: FunctionComponent<EntryProps> = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      surname: "",
      topic: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="firstName"
          name="firstName"
          label="First name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />

        <TextField
          id="surname"
          name="surname"
          label="Surname"
          type="text"
          value={formik.values.surname}
          onChange={formik.handleChange}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />

        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Entry;
