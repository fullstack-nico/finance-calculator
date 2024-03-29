import React from 'react';
import { Formik, useFormik } from 'formik';


export function Form({initialValues,onSubmit,validationSchema,children}) {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {() => (<>{children}</>)}
        </Formik>
    );
}
