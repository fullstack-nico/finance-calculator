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

import {theme} from '../../../_config/global';
import * as yup from 'yup';

import {useDispatch} from 'react-redux'
import {logout} from '../../authentication/authAction';




export function Fab(){
    // const [fab, setFab] = useState(false);
    const [actionSheet, setActionSheet] = useState(false)
    const [showModal, setShowModal] = useState(true);
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [categoryError, setCategoryError] = useState(false)
    const [subCategoryError, setSubCategoryError] = useState(false)
    const [mode, setMode] = useState("advanced")

    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch()

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const handleSubmit = (item) => {
        // if(!category) setCategoryError(true)
        if(!subCategory) setCategoryError(true)

        console.log(item)
        console.log(category)
        console.log(subCategory)
        console.log(listSubCategory)
    }

    let validationSchema = yup.object().shape({
        name: yup.string()
            .required('Name is required'),
        amount: yup.number()
            .typeError("Amount must be a number")
            .required('Amount is required'),
    });

    let listCategory = [
        {"key": 1, value: "Food"},
        {"key": 2, value: "Groceries"},
        {"key": 3, value: "Shopping"},
    ]

    let listSubCategory = [
        {"key": 1, value: "Breakfastt"},
        {"key": 2, value: "Lunchh"},
        {"key": 3, value: "Dinnerr"},
    ]

    function subCategoryInput() {
        if(mode === "advanced")
        return(
            <Select
                title={"Sub Category"}
                onValueChange={(itemValue) => setSubCategory(itemValue)}
                placeholder={"Choose Sub Category"}
            >
                {listSubCategory}
            </Select>
        )
    }





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
                       <Button
                           title={"Simple"}
                           onPress={() => setMode("simple")}
                           style={{width: '45%'}}
                       />
                        <Button
                            title={"Advanced"}
                            onPress={() => setMode("advanced")}
                            style={{width: '45%'}}
                        />
                    </View>

                    <Modal.Body>
                        <Form
                            initialValues={{name: '', amount: '' }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema} >

                            <FormInput title="Name" name="name"/>

                            <Select
                                title={"Category"}
                                onValueChange={(itemValue) => setCategory(itemValue)}
                                placeholder={"Choose Category"}
                            >
                                {listCategory}
                            </Select>

                            {/*<Select*/}
                            {/*    title={"Category"}*/}
                            {/*    onValueChange={(itemValue) => setCategory(itemValue)}*/}
                            {/*    placeholder={"Choose Category"}*/}
                            {/*>*/}
                            {/*    <Select.Item label="Food" value="Food" />*/}
                            {/*    <Select.Item label="Groceries" value="Groceries" />*/}
                            {/*    <Select.Item label="Toys" value="Toys" />*/}
                            {/*</Select>*/}

                            {/*<Menu style={{marginTop: 1, width: width*0.73, marginLeft: 5}} trigger={triggerProps => {*/}
                            {/*    return(*/}
                            {/*        <Pressable {...triggerProps}>*/}
                            {/*            <View style={styles.container}>*/}
                            {/*                <Text style={styles.text}>Category</Text>*/}
                            {/*                <View style={styles.input}>*/}
                            {/*                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM}}>{category || "Select Category"}</Text>*/}
                            {/*                    <ChevronDownIcon />*/}
                            {/*                </View>*/}
                            {/*                <FormInputErrorMsg error={"please select category"} visible={categoryError}/>*/}
                            {/*            </View>*/}

                            {/*        </Pressable>*/}
                            {/*    )*/}
                            {/*}}>*/}
                            {/*    <Menu.Item onPress={()=> setCategory("Food")}>Food</Menu.Item>*/}
                            {/*    <Menu.Item onPress={()=>setCategory("ETC")}>ETC</Menu.Item>*/}
                            {/*</Menu>*/}

                            {subCategoryInput()}

                            <FormInput title="Amount" name="amount" />

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
