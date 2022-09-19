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
    /*const id = useSelector((state) => state.formLogin.username)
    const pass = useSelector((state) => state.formLogin.password)*/
    const loginError = useSelector((state) => state.formLogin.loginError)
    const stateAuth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    let validationSchema = yup.object().shape({
        username: yup.string().email().required(),
        password: yup.number().required().positive().integer().typeError('password must be a number type'),
    });
    const handleSubmitch = (item) => {
        console.log('login button is pressed')
        dispatch(login(item))
    }

    const handleSubmitch2 = (item) => {

        console.log("handlesubmit")
        console.log(item)

        // URL of server request controller
        const URL = URL_LOGIN;

        var req = {
            keyMasterApp: KEY_MASTER_APP,
            email: item.username,
            password: item.password,
        };

//	What to do with the received data
        const processDataFromServer = (responseData) => {
            console.log("V  Login V");
            console.log(responseData);

            if(responseData.type === 'validation_parameter'){
                alert(JSON.stringify(responseData));
            }
            else if (responseData.status.status === 'fail'){
                console.log(responseData)
            }
            else if (responseData.status.status === 'success') {
                console.log(responseData)
            }
            else{
                console.log("no response")
            }

        };

        // 	If there is error, what to do
        const errorFunction = (error) => {
            alert(error);

        };

        serverPost(URL, req, processDataFromServer, errorFunction);
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
                    initialValues={{username: stateAuth.username, password: stateAuth.password}}
                    onSubmit={handleSubmitch}
                    validationSchema={validationSchema}
                >
                    <FormSubmitErrorMsg error={"Invalid Credential"} visible={loginError}/>
                    <FormInput
                        value={stateAuth.username}
                        name="username"
                        placeholder={"Username"}
                        autoCapitalized="none"
                        autoCorrect={false}
                        rounded={true} />
                    <FormInput
                        value={stateAuth.password.toString()}
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
