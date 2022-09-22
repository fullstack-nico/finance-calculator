import React from 'react';
import{
    View,
} from 'react-native';

import {Text} from '../../../component/typography';
import {ImageComponent} from '../../../component';
import {theme} from '../../../_config/global';
import {Form, FormButton, FormInput, FormSubmitErrorMsg} from '../../forms';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {register} from '../authAction';
import { useSelector, useDispatch } from 'react-redux'

export default function Register(){

    // navigation
    const navigation = useNavigation();

    // Redux hooks
    const id = useSelector((state) => state.formLogin.email)
    const pass = useSelector((state) => state.formLogin.password)
    const loginError = useSelector((state) => state.formLogin.loginError)

    const dispatch = useDispatch()

    let validationSchema = yup.object().shape({
        email: yup.string()
            .email()
            .required(),
        password: yup.string()
            .required('Password is required'),
        confirmPassword: yup.string()
            .required('confirm password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const handleSubmit = (item) => {
        dispatch(register(item))
    }

    return (
        <View style={{flex:1,  justifyContent: 'center'}}>
            <ImageComponent
                style={theme.IMAGE_LOGIN}
                source={require('../../../_resources/Images/MAIN_LoginLogo.png')}
            />
            <Text style={{fontSize: theme.FONT_SIZE_XL, alignSelf: 'center', color: '#87ceeb'}}>
                Register
            </Text>

            <View style={{margin: theme.MARGIN_SMALL}}>
                <Form
                    initialValues={{email: 'awa@gmail.com', password: '123321', confirmPassword: '123321'}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}>
                    <FormSubmitErrorMsg error={"Invalid Credential"} visible={loginError}/>
                    <FormInput
                        name="email"
                        placeholder={"Email"}
                        autoCapitalized="none"
                        autoCorrect={false}
                        rounded={true} />
                    <FormInput
                        name="password"
                        placeholder={"Password"}
                        secureTextEntry
                        textContentType="password"
                        autoCapitalized="none"
                        autoCorrect={false}
                        rounded={true}/>
                    <FormInput
                        name="confirmPassword"
                        placeholder={"Confirm Password"}
                        secureTextEntry
                        textContentType="password"
                        autoCapitalized="none"
                        autoCorrect={false}
                        rounded={true}/>
                    <FormButton style={{marginTop: 20}} title="Register" loading={false} />
                </Form>
            </View>

        </View>
    )
}
