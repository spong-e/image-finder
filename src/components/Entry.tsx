import { FunctionComponent } from "react";
import { Button, TextField, Radio, RadioGroup } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDetails, useDetailsActions } from "../providers";
import { useNavigate } from "react-router-dom";

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
  const details = useDetails();
  const { set } = useDetailsActions();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: details.firstName,
      surname: "",
      topic: "",
      thumbnail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      set(values);
      navigate("/preview");
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

        <TextField
          id="topic"
          name="topic"
          label="topic"
          value={formik.values.topic}
          onChange={formik.handleChange}
          error={formik.touched.topic && Boolean(formik.errors.topic)}
          helperText={formik.touched.topic && formik.errors.topic}
        />

        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Entry;
