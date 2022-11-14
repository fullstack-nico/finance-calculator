import React, {useState} from 'react'
import {Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import {
    Actionsheet,
    AddIcon,
    Fab as FabNativeBase,
    HamburgerIcon,
    MinusIcon,
    Modal,
    Menu,
    ChevronDownIcon,

    Box,
} from 'native-base';
import {
    Button,
    Text,
    Select
} from '../../../component';

import {Form, FormInput, FormButton, FormInputErrorMsg} from '../../forms';

import {ADD_SUB_CATEGORY,ADD_CATEGORY, theme} from '../../../_config/global';
import * as yup from 'yup';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../authentication/authAction';
import {Categories} from './Categories';
import {expenseMode} from '../../user/userSlice';
import {add_expense} from '../../user/userAction';


export function Fab(){
    // const [fab, setFab] = useState(false);
    const [actionSheet, setActionSheet] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const userState = useSelector((state) => state.user)

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const handleSubmit = (item) => {
        dispatch(add_expense({expenseName: item.name, expensePrice: item.amount}))
    }

    let validationSchema = yup.object().shape({
        // name: yup.string()
        //     .required('Name is required'),
        amount: yup.number()
            .typeError("Amount must be a number")
            .required('Amount is required'),
    });

    return(
        <Box>
            <FabNativeBase
                style = {{ backgroundColor: theme.PRIMARY_COLOR_ONE, marginBottom: 50 }}
                icon={<HamburgerIcon />}
                onPress = {() =>setActionSheet(!actionSheet)}>
            </FabNativeBase>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} closeOnOverlayClick={false}>
                <Modal.Content style={{ width: width*0.85, }}>
                    <Modal.CloseButton />
                    <Text style={{ alignSelf: 'center', marginTop: 15, marginBottom: 10}}>New Expenses</Text>

                    <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>
                        {
                            userState.expenseMode === "simple" ?
                            <Button
                                selected
                                title={"Simple"}
                                onPress={() => dispatch(expenseMode("simple"))}
                                style={{width: '45%'}}
                            />
                            :
                            <Button
                                unselected
                                title={"Simple"}
                                onPress={() => dispatch(expenseMode("simple"))}
                                style={{width: '45%'}}
                            />
                        }
                        {
                            userState.expenseMode === "advanced" ?
                                <Button
                                    selected
                                    title={"Advanced"}
                                    onPress={() => dispatch(expenseMode("advanced"))}
                                    style={{width: '45%'}}
                                />
                                :
                                <Button
                                    unselected
                                    title={"Advanced"}
                                    onPress={() => dispatch(expenseMode("advanced"))}
                                    style={{width: '45%'}}
                                />
                        }
                    </View>

                    <Modal.Body>
                        <Form
                            initialValues={{name: '', amount: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema} >

                            <FormInput title="Name" name="name" placeholder="Name of expense"/>

                            {Categories()}

                            <FormInput title="Amount (RM)" name="amount" placeholder="example: 10.00"/>

                            <FormButton
                                rounded={true}
                                title={"Confirm"}
                            />
                        </Form>
                    </Modal.Body>

                </Modal.Content>
            </Modal>





            <Actionsheet isOpen={actionSheet} onClose={() =>setActionSheet(!actionSheet)}>
                <Actionsheet.Content>
                    {/*<Box w="100%" h={60} px={4} justifyContent="center">*/}
                    {/*    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM}}>Shortcuts</Text>*/}
                    {/*</Box>*/}
                    <Actionsheet.Item
                        onPress={()=>{
                            setShowModal(true)
                            setActionSheet(!actionSheet)
                        }}
                        startIcon={<AddIcon style={{alignSelf: 'center'}}/>}
                        style={{

                            borderBottomWidth: 1,
                            borderColor: theme.PRIMARY_COLOR_ONE
                        }}>
                        Add Profit
                    </Actionsheet.Item>
                    <Actionsheet.Item
                        onPress={()=>{
                            setShowModal(true)
                            setActionSheet(!actionSheet)
                        }}
                        startIcon={<MinusIcon style={{alignSelf: 'center'}}/>}
                        style={{

                            borderBottomWidth: 1,
                            borderColor: theme.PRIMARY_COLOR_ONE
                        }}>
                        Add Expenses
                    </Actionsheet.Item>
                    <Actionsheet.Item
                        onPress={()=>{
                             dispatch(logout())
                        }}
                        startIcon={<MinusIcon style={{alignSelf: 'center'}}/>}
                        style={{

                            borderBottomWidth: 1,
                            borderColor: theme.PRIMARY_COLOR_ONE
                        }}>
                        Log out
                    </Actionsheet.Item>


                </Actionsheet.Content>
            </Actionsheet>
        </Box>
    )
}

const styles = StyleSheet.create({
    container:{
        margin: theme.MARGIN_SMALL,
    },
    text:{
        marginBottom: 5,
        fontSize: theme.FONT_SIZE_MEDIUM
    },
    input:{
        height: 40,
        alignItems:"center",
        flexDirection: "row",
        padding:5,
        /*borderBottomWidth: 1,*/
        borderBottomColor: 'grey',
        backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'black',
        justifyContent: 'space-between',

        /*margin: styless.abc.margin*/
    },
})
