import React from "react";
import ReactDOM from "react-dom";
import generate from "./GenDoc";

import "./styles.css";

import { useForm, useField, splitFormProps } from "react-form";

const InputField = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    //meta: { error, isTouched, isValidating, message },
    getInputProps
  } = useField(field, fieldOptions);

  // Build the field
  return <input {...getInputProps({ ref, ...rest })} />;
});

const AreaField = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    //meta: { error, isTouched, isValidating, message },
    getInputProps
  } = useField(field, fieldOptions);

  // Build the field
  return <textarea {...getInputProps({ ref, ...rest })} />;
});

function App() {
  const defaultValues = React.useMemo(
    () => ({
      name: "Alex",
      phone: "248-568-8923",
      email: "Alex@gmail.com",
      experience: ["Engineer"],
      company: ["eshocan"],
      date: ["6/12/2020"],
      duties: ["This is a note."]
    }),
    []
  );
  const {
    Form,
    values,
    pushFieldValue,
    removeFieldValue,
    meta: { isSubmitting, isSubmitted, canSubmit, error }
  } = useForm({
    defaultValues,
    onSubmit: async (values, instance) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      generate(values);
    },
    debugForm: true
  });

  return (
    <Form>
      <div>
        <label>
          Name:{" "}
          <InputField
            field="name"
            //validate={(value) => (!value ? "Required" : false)}
          />
        </label>
      </div>

      <div>
        <label>
          Technical Expertise:{" "}
          <AreaField field="skills" defaultValue="This is a note." />
        </label>
      </div>
      <div>
        Experience
        <div
          style={{
            border: "1px solid black",
            padding: "1rem"
          }}
        >
          {values.experience.map((job, i) => (
            <div key={i}>
              <label>
                Job Title: <InputField field={`experience.${i}`} /> Company:{" "}
                <InputField field={`company.${i}`} /> Date:{" "}
                <InputField field={`date.${i}`} /> Duties:{" "}
                <AreaField field={`duties.${i}`} />{" "}
                <button
                  type="button"
                  onClick={() => removeFieldValue("experience", i)}
                >
                  X
                </button>
              </label>
            </div>
          ))}
          <button
            type="button"
            onClick={() => pushFieldValue("experience", "")}
          >
            Add Job
          </button>
        </div>
      </div>

      {isSubmitted ? <em>Thanks for submitting!</em> : null}

      {error ? <strong>{error}</strong> : null}

      {isSubmitting ? (
        "Submitting..."
      ) : (
        <div>
          <button type="submit" disable={!canSubmit}>
            Submit
          </button>
        </div>
      )}
    </Form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
