import { FunctionComponent } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="field">
          <label htmlFor="firstName">First name</label>

          <input
            id="firstName"
            name="firstName"
            placeholder="First name"
            data-testid="firstNameInput"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className=""
          />

          {formik.touched.firstName && Boolean(formik.errors.firstName) && (
            <div className="error-message">{formik.errors.firstName}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            placeholder="Last name"
            data-testid="lastNameInput"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className=""
          />

          {formik.touched.lastName && Boolean(formik.errors.lastName) && (
            <div className="error-message">{formik.errors.lastName}</div>
          )}
        </div>
      </div>

      <div className="topicOptions">
        <fieldset>
          {topicOptions.map((topic) => {
            return (
              <div className="floatBlock" key={`topic_${topic.value}`}>
                <label htmlFor={`topic_${topic.value}`}>
                  <input
                    type="radio"
                    id={`topic_${topic.value}`}
                    name="topic"
                    value={topic.value}
                    checked={formik.values.topic === topic.value}
                    onChange={formik.handleChange}
                    data-testid={`topic_${topic.value}Radio`}
                  />
                  {topic.label}
                </label>
              </div>
            );
          })}
        </fieldset>
      </div>

      <div className="row">
        <div className="field">
          {otherSelected && (
            <>
              <label htmlFor="otherTopic">Other topic</label>
              <input
                id="otherTopic"
                name="otherTopic"
                placeholder="Other topic"
                onChange={formik.handleChange}
                data-testid="otherTopicInput"
              />

              {formik.touched.otherTopic &&
                Boolean(formik.errors.otherTopic) && (
                  <div className="error-message">
                    {formik.errors.otherTopic}
                  </div>
                )}
            </>
          )}
        </div>
      </div>

      <div className="row">
        <button className="button" type="submit" data-testid="submitBtn">
          Search
        </button>
      </div>
    </form>
  );
};

export default Entry;
