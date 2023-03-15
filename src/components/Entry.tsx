import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Form, Input, Radio } from "semantic-ui-react";
import * as Yup from "yup";

import { ROUTES } from "../constants";
import { useDetailsActions } from "../providers";

const topicOptions = [
  { label: "Travel", value: "travel" },
  { label: "Cars", value: "cars" },
  { label: "Wildlife", value: "wildlife" },
  { label: "Technology", value: "technology" },
  { label: "Other", value: "other" },
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  thumbnail: Yup.string(),
  topic: Yup.string(),
  otherTopic: Yup.string().when("topic", {
    is: (val: string) => val === "other",
    then: () => Yup.string().required("Other topic is required"),
  }),
});

const Entry: FunctionComponent = () => {
  const { setDetails } = useDetailsActions();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      topic: "",
      otherTopic: "",
      thumbnail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.topic === "other") values.topic = values.otherTopic;

      const details: Details = {
        firstName: values.firstName,
        lastName: values.lastName,
        topic: values.topic,
        thumbnail: values.thumbnail,
      };

      setDetails(details);
      navigate(ROUTES.SEARCH);
    },
  });

  const otherSelected = formik.values.topic === "other";

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            id="firstName"
            control={Input}
            label="First name"
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            data-testid="firstNameInput"
            error={
              formik.touched.firstName &&
              Boolean(formik.errors.firstName) && {
                pointing: "above",
                content: formik.errors.firstName,
              }
            }
          />

          <Form.Field
            id="lastName"
            control={Input}
            label="Last name"
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            data-testid="lastNameInput"
            error={
              formik.touched.lastName &&
              Boolean(formik.errors.lastName) && {
                pointing: "above",
                content: formik.errors.lastName,
              }
            }
          />
        </Form.Group>
        <Form.Group inline>
          {topicOptions.map((topic) => {
            return (
              <Form.Field key={`topic_${topic.value}`}>
                <Radio
                  id={`topic_${topic.value}`}
                  label={topic.label}
                  name="topic"
                  value={topic.value}
                  checked={formik.values.topic === topic.value}
                  onChange={formik.handleChange}
                  data-testid={`topic_${topic.value}Radio`}
                />
              </Form.Field>
            );
          })}
        </Form.Group>
        <Form.Group widths="equal">
          {otherSelected && (
            <Form.Field
              id="otherTopic"
              control={Input}
              label="Other topic"
              placeholder="Other topic"
              onChange={formik.handleChange}
              data-testid="otherTopicInput"
              error={
                formik.touched.otherTopic &&
                Boolean(formik.errors.otherTopic) && {
                  content: formik.errors.otherTopic,
                }
              }
            />
          )}
        </Form.Group>

        <Form.Button primary type="submit" data-testid="submitBtn">
          Search
        </Form.Button>
      </Form>
    </div>
  );
};

export default Entry;
