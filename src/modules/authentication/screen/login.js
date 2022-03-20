import React, {Component} from 'react';
import {
    TextInput,
    Text,
    TouchableNativeFeedback,
    View,
    StyleSheet,
} from 'react-native';

import theme from '../../../_config/global/style/theme.style'

import { useSelector, useDispatch } from 'react-redux'
import {loggedIn} from '../authSlice';

import * as yup from 'yup';
import {Form, FormButton, FormInput, FormSubmitErrorMsg} from '../../forms';
import {loginError} from '../authSlice'
import ImageComponent from '../../../component/media/image';
import {Button} from '../../../component';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

    // navigation
    const navigation = useNavigation();

    // Redux hooks
    /*const id = useSelector((state) => state.formLogin.username)
    const pass = useSelector((state) => state.formLogin.password)*/
    const loginError = useSelector((state) => state.formLogin.loginError)
    const stateAuth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    let validationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.number().required().positive().integer(),
    });

    const handleSubmit = () => {
        dispatch(loggedIn(true))
    }

    return (
        <View style={{flex:1,  justifyContent: 'center'}}>
            <ImageComponent
                style={theme.IMAGE_LOGIN}
                source={require('../../../_resources/Images/MAIN_LoginLogo.png')}
            />
            <Text style={{fontSize: theme.FONT_SIZE_XL, alignSelf: 'center', color: '#87ceeb'}}>Login</Text>
            <Text>{stateAuth.loggedIn.toString()}</Text>

            <View style={{margin: theme.MARGIN_SMALL}}>
                <Form
                    initialValues={{username: '', password: ''}}
                    onSubmit={handleSubmit}
                    /*validationSchema={validationSchema}*/
                >
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
                    <FormButton style={{marginTop: 20}} title="Login" loading={false} />
                </Form>
            </View>

            <Button
                unstyled
                onPress={()=> navigation.navigate('register')}
                title={"Register"}/>
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
