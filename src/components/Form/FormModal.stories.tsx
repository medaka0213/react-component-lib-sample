import React from 'react';
import { Formik, useFormik } from 'formik';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormModal } from './FormModal';
import { Button } from '@mui/material';
import { FormGrid } from './FormGrid';
import { FormInput } from './FormInput';

export default {
  component: FormModal,
  title: 'FormModal',
};

const Form = ({ onSubmit }: any) => (
  <Formik initialValues={{ name: 'name' }} onSubmit={onSubmit}>
    {(formik) => (
      <form>
        <FormGrid
          formik={formik}
          childrenList={[
            [<FormInput key="name" name="name" formik={formik} />],
          ]}
        />
      </form>
    )}
  </Formik>
);

const Template: ComponentStory<typeof FormModal> = (args) => (
  <FormModal {...args}>
    <Button variant="contained">Click</Button>
  </FormModal>
);

export const Default = Template.bind({});
Default.args = {
  Form: Form,
};
