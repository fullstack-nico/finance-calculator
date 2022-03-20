import React from 'react';
import { useFormikContext } from 'formik';
import {Button, Spinner} from '../../component';

export function FormButton({title, loading, style}) {
    const {handleSubmit} = useFormikContext();

    if(loading) return <Spinner />
    return <Button style={style} title={title} onPress={handleSubmit} />
}
