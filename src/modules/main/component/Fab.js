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
} from 'native-base';
import {Text} from '../../../component';
import {Form, FormInput, FormButton, FormInputErrorMsg} from '../../forms';

import {theme} from '../../../_config/global';
import * as yup from 'yup';

import {useDispatch} from 'react-redux'
import {logout} from '../../authentication/authAction';



export function Fab(){
    // const [fab, setFab] = useState(false);
    const [actionSheet, setActionSheet] = useState(false)
    const [showModal, setShowModal] = useState(true);
    const [category, setCategory] = useState('Select Category')
    const [categoryError, setCategoryError] = useState(false)
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const handleSubmit = (item) => {
        if(category === 'Select Category') setCategoryError(true)
        console.log(item)
        console.log(category)
    }

    let validationSchema = yup.object().shape({
        name: yup.string()
            .required('Name is required'),
        amount: yup.number()
            .typeError("Amount must be a number")
            .required('Amount is required'),

    });


    return(
        <>
            <FabNativeBase
                style = {{ backgroundColor: theme.PRIMARY_COLOR_ONE, marginBottom: 50 }}
                icon={<HamburgerIcon />}
                onPress = {() =>setActionSheet(!actionSheet)}>
            </FabNativeBase>


            <Modal isOpen={showModal} onClose={() => setShowModal(false)} closeOnOverlayClick={false}>
                <Modal.Content style={{ width: width*0.85, }}>
                    <Modal.CloseButton />
                    <Modal.Header>New Expenses</Modal.Header>

                    <Modal.Body>
                        <Form
                            initialValues={{name: '', amount: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema} >

                            <FormInput title="Name" name="name"/>

                            <Menu style={{marginTop: 20, width: width*0.73, marginLeft: 5}} trigger={triggerProps => {
                                return(
                                    <Pressable {...triggerProps}>
                                        <View style={styles.container} name="uwu">
                                            <Text style={styles.text}>Category</Text>
                                            <View style={styles.input}>
                                                <Text style={{fontSize: theme.FONT_SIZE_MEDIUM}}>{category}</Text>
                                                <ChevronDownIcon />
                                            </View>
                                            <FormInputErrorMsg error={"please select category"} visible={categoryError}/>
                                        </View>

                                    </Pressable>
                                )
                            }}>
                                <Menu.Item onPress={()=> setCategory("ETC")}>Food</Menu.Item>
                                <Menu.Item onPress={()=>setCategory("ETC")}>ETC</Menu.Item>
                            </Menu>
                            <FormInput title="Amount" name="amount" />

                            <FormButton
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
        </>
    )


    // return(
    //     <View>
    //     {
    //         fab ?
    //             <View>
    //                 <FabNativeBase
    //                     style = {{ backgroundColor: theme.PRIMARY_COLOR_ONE, marginBottom: 50 }}
    //                     icon={<HamburgerIcon />}
    //                     onPress = {() =>setFab(!fab)}>
    //                 </FabNativeBase>
    //                 <FabNativeBase
    //                     style = {{ backgroundColor: theme.PRIMARY_COLOR_ONE, marginBottom: 110 }}
    //                     icon={<AddIcon />}
    //                     onPress = {() =>setFab(!fab)}>
    //                 </FabNativeBase>
    //             </View>
    //             :
    //             <FabNativeBase
    //                 style = {{ backgroundColor: theme.PRIMARY_COLOR_ONE, marginBottom: 50 }}
    //                 icon={<HamburgerIcon />}
    //                 onPress = {() =>setFab(!fab)}>
    //             </FabNativeBase>
    //     }
    //     </View>
    // )
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
