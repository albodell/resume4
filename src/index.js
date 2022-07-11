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

function App() {
  const defaultValues = React.useMemo(
    () => ({
      name: "tanne",
      age: "29",
      email: "tanner@gmail.com",
      friends: ["jaylen"]
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
    // validate: values => {
    //   if (values.name === "tanner" && values.age !== "29") {
    //     return "This is not tanner's correct age";
    //   }
    //   return false;
    // },
    onSubmit: async (values, instance) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      generate(values["name"]);
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
          Notes:{" "}
          <InputField field="other.notes" defaultValue="This is a note." />
        </label>
      </div>
      <div>
        Friends
        <div
          style={{
            border: "1px solid black",
            padding: "1rem"
          }}
        >
          {values.friends.map((friend, i) => (
            <div key={i}>
              <label>
                Friend: <InputField field={`friends.${i}`} />{" "}
                <button
                  type="button"
                  onClick={() => removeFieldValue("friends", i)}
                >
                  X
                </button>
              </label>
            </div>
          ))}
          <button type="button" onClick={() => pushFieldValue("friends", "")}>
            Add Friend
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
