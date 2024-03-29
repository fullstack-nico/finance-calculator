import React, {Component} from 'react';
import {
    TextInput,
    Text,
    TouchableNativeFeedback,
    View,
    StyleSheet,
} from 'react-native';

import {theme} from '../../../_config/global'

import { useSelector, useDispatch } from 'react-redux'
import {loggedIn} from '../authSlice';

import * as yup from 'yup';
import {Form, FormButton, FormInput, FormSubmitErrorMsg} from '../../forms';
import {loginError} from '../authSlice'
import {ImageComponent} from '../../../component';
import {Button} from '../../../component';
import { useNavigation } from '@react-navigation/native';
import {serverPost} from '../../../_config/global/functions';
import {URL_LOGIN, KEY_MASTER_APP} from '../../../_config/global';

// (￣▽￣)  REDUX stuff and actions
import { connect } from 'react-redux';
import {loginTest, login} from '../authAction';


function Login() {

    // navigation
    const navigation = useNavigation();

    // Redux hooks
    /*const id = useSelector((state) => state.formLogin.email)
    const pass = useSelector((state) => state.formLogin.password)*/
    const loginError = useSelector((state) => state.formLogin.loginError)
    const stateAuth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    let validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const handleLogin = (item) => {
        console.log('login button is pressed')
        dispatch(login(item))
    }

    return (
        <View style={{flex:1,  justifyContent: 'center'}}>
            <ImageComponent
                style={theme.IMAGE_LOGIN}
                source={require('../../../_resources/Images/MAIN_LoginLogo.png')}
            />
            <Text style={{fontSize: theme.FONT_SIZE_XL, alignSelf: 'center', color: '#87ceeb'}}>Login</Text>

            <View style={{margin: theme.MARGIN_SMALL}}>
                <Form
                    initialValues={{email: stateAuth.email, password: stateAuth.password}}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}
                >
                    <FormSubmitErrorMsg error={"Invalid Credential"} visible={loginError}/>
                    <FormInput
                        // initialValue={stateAuth.email}
                        name="email"
                        placeholder={"Email"}
                        autoCapitalized="none"
                        autoCorrect={false}
                        rounded={true} />
                    <FormInput
                        // initialValue={stateAuth.password.toString()}
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

export default Login;
