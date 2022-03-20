import React from 'react';
import{
    View,
} from 'react-native';

import {Text} from '../../../component/typography';
import ImageComponent from '../../../component/media/image';
import theme from '../../../_config/global/style/theme.style';
import {Form, FormButton, FormInput, FormSubmitErrorMsg} from '../../forms';
import {Button} from '../../../component/form';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import * as yup from 'yup';

export default function register(){

    // navigation
    const navigation = useNavigation();

    // Redux hooks
    const id = useSelector((state) => state.formLogin.username)
    const pass = useSelector((state) => state.formLogin.password)
    const loginError = useSelector((state) => state.formLogin.loginError)

    let validationSchema = yup.object().shape({
        username: yup.string()
            .required(),
        password: yup.string()
            .required('Password is required'),
        confirmPassword: yup.string()
            .required('confirm password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const handleSubmit = () => {
        alert("uwu")
    }

    return(
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
                    initialValues={{username: '', password: '', confirmPassword: ''}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema} >
                    <FormSubmitErrorMsg error={"Invalid Credential"} visible={loginError}/>
                    <FormInput
                        name="username"
                        placeholder={"Username"}
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
