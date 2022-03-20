import React from 'react';
import { useFormikContext } from 'formik';

import {FormInputErrorMsg} from './FormInputErrorMsg'
import {Input} from "../../component";
export function FormInput({name,width,...otherProps}) {
    const {setFieldTouched,setFieldValue,errors,touched,values} = useFormikContext();
    return (
        <>
            <Input
                onBlur={() => setFieldTouched(name)}
                onChangeText={text => setFieldValue(name,text)}
                values={values[name]}
                width={width}
                {...otherProps}
            >
                <FormInputErrorMsg error={errors[name]} visible={touched[name]}/>
            </Input>

        </>
    );
}
