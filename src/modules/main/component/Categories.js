import React, {useEffect, useState} from 'react';
import {Form, FormButton, FormInput} from '../../forms';
import {Modal} from 'native-base';
import {Text} from '../../../component/typography';
import {ADD_CATEGORY, ADD_SUB_CATEGORY, MODE_CATEGORY, MODE_SUBCATEGORY, USER_TOKEN, USER_TOKEN_DESC} from '../../../_config/global/constants';
import {Button, Select} from '../../../component/form';
import {Pressable, useWindowDimensions, View} from 'react-native';
import {loadData, theme} from '../../../_config/global';
import {useDispatch, useSelector} from 'react-redux';
import {category, subCategory, setCategoriesModal} from '../../user/userSlice';
import {get_expense_category, add_expense_category, getUserData_all} from '../../user/userAction';
import {loggedIn as funcLoggedIn} from '../../authentication/authSlice';
import * as yup from 'yup';


export function Categories(){

    const [modalCategory, setModalCategory] = useState(false);
    const [modalSubCategory, setModalSubCategory] = useState(false)


    const [mode, setMode] = useState("add")
    const [editing, setEditing] = useState(false);
    const [loading,  setLoading] = useState(false)
    const [ loading_edit_categoryList, setLoading_edit_categoryList] = useState(false);
    const [editItemSelected,  setEditItemSelected] = useState(false)

    const userState = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const { width } = useWindowDimensions();

    useEffect(()=>{
        if(loading_edit_categoryList) {
            console.log("--->", userState.mode)
            dispatch(get_expense_category({categoryType: userState.mode, editing: true, subcategoryValue: userState.category}))
            setLoading_edit_categoryList(false);
        }
        if(userState.isOpen === false) {
            dispatch(get_expense_category({categoryType: userState.mode, editing: false}))
        }
        // if(userState.expenseMode === "advanced" ){
        //     dispatch(get_expense_category({categoryType: 'subcategory', editing: false, subcategoryValue: userState.category}))
        // }

    }, [loading_edit_categoryList, userState.isOpen]);

    // useEffect(()=>{
    //     dispatch(get_expense_category({categoryType: 'category', editing: false}))
    // }, [])

    function categoryInput(){
        return(
            <Select
                title={"Category"}
                onValueChange={(itemValue) => {
                    if(itemValue === ADD_CATEGORY) {
                        dispatch(setCategoriesModal({
                            isOpen: true,
                            onClose: null,
                            title: "Categories",
                            initialValues: null,
                            handleSubmitModal: null,
                            inputTitle: "Category",
                            inputName: 'category',
                            placeholder: "Enter category",
                            mode: MODE_CATEGORY,
                        }))
                    }
                    else {
                        dispatch(category(itemValue));
                        if(userState.expenseMode === "advanced") {
                            dispatch(get_expense_category({categoryType: MODE_SUBCATEGORY, editing: false, subcategoryValue: itemValue}))
                        }
                    }

                }}
                placeholder={"Choose Category"}
            >
                {userState.categoryList}
            </Select>
        )
    }

    function subCategoryInput() {
        if(userState.expenseMode === "advanced")
            return(
                <Select
                    title={"Sub Category"}
                    onValueChange={(itemValue) => {
                        if(itemValue === ADD_SUB_CATEGORY) {
                            dispatch(setCategoriesModal({
                                isOpen: true,
                                onClose: null,
                                title: "Sub Category",
                                initialValues: null,
                                handleSubmitModal: null,
                                inputTitle: "Sub Category",
                                inputName: 'sub category',
                                placeholder: "Enter sub category",
                                mode: MODE_SUBCATEGORY,
                            }))
                        }
                        else dispatch(subCategory(itemValue))
                    }}
                    placeholder={"Choose Sub Category"}
                >
                    {userState.subCategoryList}
                </Select>
            )
    }

    function modalAddEdit(){
        return(
            <Modal isOpen={userState.isOpen} onClose={()=> {
                        dispatch(setCategoriesModal({isOpen: false}));
                    }}
                   closeOnOverlayClick={false}>
                <Modal.Content style={{ width: width*0.85, }}>
                    <Modal.CloseButton />

                    <Text style={{ alignSelf: 'center', marginTop: 15, marginBottom: 10}}>{userState.title}</Text>

                    <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>

                        <Button
                            title={"Add"}
                            onPress={() => {
                                // setLoading(true)
                                setMode('add');
                            }}
                            style={{width: '45%'}}
                        />
                        <Button
                            title={"Edit"}
                            onPress={() => {
                                setLoading_edit_categoryList(true)
                                setMode('edit');
                                setEditing(true);
                                setEditItemSelected(false) // can choose item to edit in the selector again
                            }}
                            style={{width: '45%'}}
                        />
                    </View>

                    <Modal.Body>
                        {modalIsEditing()}
                    </Modal.Body>

                </Modal.Content>
            </Modal>
        )
    }



    function modalIsEditing(){
        if(loading) return <></>

        let initialValues = {};
        if(mode === "edit") {

            initialValues = {item: userState.category};
            if(userState.mode === MODE_SUBCATEGORY) initialValues = {item: userState.subCategory}

                if(editItemSelected){
                return(
                    <Form
                        initialValues={initialValues}
                        onSubmit={(item)=>
                        console.log(item)
                        }
                    >

                        <FormInput
                            placeholder={userState.placeholder}
                            title={"Edit " + userState.inputTitle} name={"item"}/>

                        <FormButton
                            rounded={true}
                            title={"Confirm"}
                        />
                    </Form>
                )
            }

            return(
                <Select
                    title={"Select "+ userState.title + " to edit"}
                    onValueChange={(itemValue) => {
                        dispatch(category(itemValue));
                        setEditItemSelected(true)
                    }}
                    placeholder={"Choose " + userState.title}
                >
                    {userState.mode === MODE_CATEGORY ?
                        userState.categoryList : userState.subCategoryList}
                </Select>
            )

        }

        // If modal mode === add
        return(
            <Form
                initialValues={initialValues}
                onSubmit={(item)=>{
                    if(userState.mode === MODE_CATEGORY) dispatch(add_expense_category(item))
                    // add dispatch expense subcategory here
                }}
            >

                <FormInput
                    placeholder={userState.placeholder}
                    title={"Add " + userState.inputTitle} name={"item"}/>

                <FormButton
                    rounded={true}
                    title={"Confirm"}
                />
            </Form>
        )
    }




    // function modalAddSimple({initialValues={}, handleSubmitModal, inputTitle, inputName}){
    //     return(
    //
    //         <Form
    //             initialValues={initialValues}
    //             onSubmit={handleSubmitModal}
    //         >
    //
    //             <FormInput title={inputTitle} name={"item"}/>
    //
    //             <FormButton
    //                 rounded={true}
    //                 title={"Confirm"}
    //             />
    //         </Form>
    //
    //     )
    // }


    return(
        <>
            {modalAddEdit()}
            {/*{modalForCategorySubCategory()}*/}
            {categoryInput()}
            {subCategoryInput()}
        </>
    )
}


