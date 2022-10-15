import React, {useEffect, useState} from 'react';
import {Form, FormButton, FormInput} from '../../forms';
import {Modal} from 'native-base';
import {Text} from '../../../component/typography';
import {ADD_CATEGORY, ADD_SUB_CATEGORY, USER_TOKEN, USER_TOKEN_DESC} from '../../../_config/global/constants';
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
    const [editItemSelected,  setEditItemSelected] = useState(false)

    const userState = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const { width } = useWindowDimensions();

    // let listCategory = [
    //     {"key": 1, label: "Food", value: "Food"},
    //     {"key": 2, label: "Groceries", value: "Groceries"},
    //     {"key": 3, label: "Shopping", value: "Shopping"},
    // ]
    //
    // listCategory.push({"key": listCategory[listCategory.length-1].key +1,
    //     label: "add category", value: ADD_CATEGORY})


    let listSubCategory = [
        {"key": 1, label: "Breakfastt", value: "Breakfastt"},
        {"key": 2, label: "Lunchh", value: "Lunchh"},
        {"key": 3, label: "Dinnerr", value: "Dinnerr"},
    ]

    listSubCategory.push({"key": listSubCategory[listSubCategory.length-1].key +1,
        label: "add sub category", value: ADD_SUB_CATEGORY})

    useEffect(()=>{
        if(loading) {
            dispatch(get_expense_category({categoryType: 'category', editing: true}))
            setLoading(false);
        }
        if(userState.isOpen === false) {
            dispatch(get_expense_category({categoryType: 'category', editing: false}))
        }
        // if(userState.expenseMode === "advanced" ){
        //     dispatch(get_expense_category({categoryType: 'subcategory', editing: false, subcategoryValue: userState.category}))
        // }

    }, [loading, userState.isOpen]);

    // useEffect(()=>{
    //     dispatch(get_expense_category({categoryType: 'category', editing: false}))
    // }, [])

    function categoryInput(){
        return(
            <Select
                title={"Category"}
                onValueChange={(itemValue) => {
                    if(itemValue === ADD_CATEGORY) {
                        // setModalCategory(true);
                        dispatch(setCategoriesModal({
                            isOpen: true,
                            onClose: null,
                            title: "Categories",
                            initialValues: null,
                            handleSubmitModal: null,
                            inputTitle: "Category",
                            inputName: 'category',
                            placeholder: "Enter category"
                        }))
                    }
                    else {
                        dispatch(category(itemValue));
                        if(userState.expenseMode === "advanced") {
                            dispatch(get_expense_category({categoryType: 'subcategory', editing: false, subcategoryValue: userState.category}))
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
                            setModalSubCategory(true);
                        }
                        else dispatch(subCategory(itemValue))
                    }}
                    placeholder={"Choose Sub Category"}
                >
                    {listSubCategory}
                </Select>
            )
    }

    function modalForCategory(){


        // const handleSubmitModal = (item) => {
        //     console.log(item)
        // }

        // return modalEdit({
        //     isOpen: modalCategory,
        //     onClose,
        //     title: "EDIT",
        //     handleSubmitModal,
        //
        // })

        // dispatch(setCategoriesModal({
        //     title: "EDIT",
        // }))

        return modalEdit();
    }



    function modalForCategorySubCategory(){
        const onClose =  ()=>{
            setModalSubCategory(false);
        }

        const handleSubmitModal = (item) => {
            console.log("subCategory" ,item)
        }

        return modalAddSimple({
            isOpen: modalSubCategory,
            onClose,
            title: "Add Edit",
            inputTitle: "Sub Category",
            handleSubmitModal,
        })
    }

    function addEditBar(){
        if(editing) return(
            <>
                <Pressable onPress={()=> setEditing(false)}>
                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM, color: theme.PRIMARY_COLOR_ONE}}>cancel</Text>
                </Pressable>
            </>
        )

        return(
            <>
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
                        setLoading(true)
                        setMode('edit');
                        setEditing(true);
                    }}
                    style={{width: '45%'}}
                />
            </>
        )
    }

    function modalEdit(){
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
                                setLoading(true)
                                setMode('edit');
                                setEditing(true);
                                setEditItemSelected(false)
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
        // if(mode === "edit") return modalEditing()

        let initialValues = {};
        if(mode === "edit") {
            initialValues = {item: userState.category};

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
                    title={"Select category to edit"}
                    onValueChange={(itemValue) => {
                        dispatch(category(itemValue));
                        setEditItemSelected(true)
                    }}
                    placeholder={"Choose Category"}
                >
                    {userState.categoryList}
                </Select>
            )

        }



        return(
            <Form
                initialValues={initialValues}
                onSubmit={(item)=> dispatch(add_expense_category(item))}
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
            {modalForCategory()}
            {/*{modalForCategorySubCategory()}*/}
            {categoryInput()}
            {subCategoryInput()}
        </>
    )
}


