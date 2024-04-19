import React from "react";
import { FormProvider as Form } from "react-hook-form";
const FormProvider = ({ children, onSubmit, methods }) => {
  return (
    <Form {...methods}>
      <form style={{ width: "100%" }} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
};

export default FormProvider;
