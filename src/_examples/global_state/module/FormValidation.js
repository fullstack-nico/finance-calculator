import React, {Component} from 'react';
import {
    TextInput,
    Text,
    TouchableNativeFeedback,
    View,
    StyleSheet,
} from 'react-native';

import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux'
import {Form, FormButton, FormInput, FormSubmitErrorMsg} from "../../../modules/forms";
import {loginError} from "../../../modules/authentication/authSlice";

export default function FormValidation() {

    // Redux hooks
    const id = useSelector((state) => state.formLogin.username)
    const pass = useSelector((state) => state.formLogin.password)
    const loginError = useSelector((state) => state.formLogin.loginError)

    let validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.number().required().positive().integer(),
    });

    const handleSubmit = () => {
        alert("uwu")
    }

    return (
            <View style={{flex:1,  justifyContent: 'center'}}>
                <Form
                    initialValues={{username: '', password: ''}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema} >
                    <FormSubmitErrorMsg error={"Invalid Credential"} visible={loginError}/>
                    <FormInput
                        name="username"
                        placeholder={"Username"}
                        autoCapitalized="none"
                        autoCorrect={false}
                        rounded={true}
                    />
                    <FormInput
                        name="password"
                        placeholder={"Password"}
                        secureTextEntry
                        textContentType="password"
                        autoCapitalized="none"
                        autoCorrect={false}
                        rounded={true}
                    />
                    <FormButton title="Login" loading={false} />
                </Form>
            </View>
    )
}

const styles = StyleSheet.create({
    button:{
        height: 50,
        backgroundColor: 'red',
        width: 300,
        margin:10,
    }
});
