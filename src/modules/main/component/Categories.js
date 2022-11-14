import React, {useEffect, useState} from 'react';
import {Form, FormButton, FormInput} from '../../forms';
import {Modal} from 'native-base';
import {Text} from '../../../component/typography';
import {ADD_CATEGORY, ADD_SUB_CATEGORY, MODE_CATEGORY, MODE_SUBCATEGORY, USER_TOKEN, USER_TOKEN_DESC} from '../../../_config/global/constants';
import {Button, Select} from '../../../component/form';
import {Pressable, useWindowDimensions, View} from 'react-native';
import {loadData, theme} from '../../../_config/global';
import {useDispatch, useSelector} from 'react-redux';
import {category, subCategory, setCategoriesModal, setCategoriesModal_isOpen} from '../../user/userSlice';
import {
    get_expense_category,
    add_expense_category,
    update_expense_category,
    expense_category_key,
} from '../../user/userAction';


export function Categories(){

    const [mode, setMode] = useState("add")

    const [ loading_edit_categoryList, setLoading_edit_categoryList] = useState(false);
    const [editItemSelected,  setEditItemSelected] = useState(false)

    const userState = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const { width } = useWindowDimensions();

    useEffect(()=>{
        if(loading_edit_categoryList) {
            console.log("loading_edit_categoryList 1")
            dispatch(get_expense_category({categoryType: userState.mode, editing: true, subcategoryValue: userState.category}))
            setLoading_edit_categoryList(false);
        }
        if(userState.isOpen === false) {
            console.log("loading_edit_categoryList 2")
            dispatch(get_expense_category({categoryType: userState.mode, editing: false, subcategoryValue: userState.category}))
        }
        // if(userState.expenseMode === "advanced" ){
        //     dispatch(get_expense_category({categoryType: 'subcategory', editing: false, subcategoryValue: userState.category}))
        // }

    }, [loading_edit_categoryList, userState.isOpen]);

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
                        dispatch(expense_category_key({mode: MODE_CATEGORY, value: itemValue}));
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
                        else {
                            dispatch(expense_category_key({mode: MODE_SUBCATEGORY, value: itemValue}));
                            dispatch(subCategory(itemValue));
                        }
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
                        dispatch(setCategoriesModal_isOpen({isOpen: false}));
                    }}
                   closeOnOverlayClick={false}>
                <Modal.Content style={{ width: width*0.85, }}>
                    <Modal.CloseButton />

                    <Text style={{ alignSelf: 'center', marginTop: 15, marginBottom: 10}}>{userState.title}</Text>

                    <View style={{ flexDirection: 'row', marginLeft: 15, marginRight: 15, justifyContent: 'space-between' }}>

                        {
                            mode === "add" ?
                                <Button
                                    selected={true}
                                    title={"Add"}
                                    onPress={() => {
                                        // setLoading(true)
                                        setMode('add');
                                    }}
                                    style={{width: '45%'}}
                                />
                                :
                                <Button
                                    unselected={true}
                                    title={"Add"}
                                    onPress={() => {
                                        // setLoading(true)
                                        setMode('add');
                                    }}
                                    style={{width: '45%'}}
                                />
                        }
                        {
                            mode === "edit" ?
                                <Button
                                    selected={true}
                                    title={"Edit"}
                                    onPress={() => {
                                        setLoading_edit_categoryList(true)
                                        setMode('edit');
                                        setEditItemSelected(false) // can choose item to edit in the selector again
                                    }}
                                    style={{width: '45%'}}
                                />
                                :
                                <Button
                                    unselected={true}
                                    title={"Edit"}
                                    onPress={() => {
                                        setLoading_edit_categoryList(true)
                                        setMode('edit');
                                        setEditItemSelected(false) // can choose item to edit in the selector again
                                    }}
                                    style={{width: '45%'}}
                                />
                        }

                    </View>

                    <Modal.Body>
                        {modalIsEditing()}
                    </Modal.Body>

                </Modal.Content>
            </Modal>
        )
    }



    function modalIsEditing(){
        // if(loading) return <></>

        let initialValues = {};
        if(mode === "edit") {

            initialValues = {item: userState.category};
            if(userState.mode === MODE_SUBCATEGORY) initialValues = {item: userState.subCategory}

                if(editItemSelected){
                return(
                    <Form
                        initialValues={initialValues}
                        onSubmit={({item})=> {
                            console.log("MODE_CATEGORY", MODE_CATEGORY)
                            dispatch(update_expense_category({
                                categoryType: userState.mode,
                                categoryKey_label: userState.category,
                                subCategoryKey_label: userState.subCategory,
                                value: item,
                            }))
                        }}
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
                        console.log("edit category =" + itemValue)
                        if(userState.mode === MODE_CATEGORY) dispatch(category(itemValue));
                        else {
                            if(itemValue === ADD_SUB_CATEGORY) setMode('add');
                            else dispatch(subCategory(itemValue));
                        }
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
                    dispatch(add_expense_category({item: item.item, mode: userState.mode, categoryName: userState.category}))
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


    return(
        <>
            {modalAddEdit()}
            {categoryInput()}
            {subCategoryInput()}
        </>
    )
}


