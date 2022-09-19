import React from 'react';
import{StyleSheet, View, ScrollView} from 'react-native';
import {Container} from '../component';
import {
    Text
} from '../../../component'
import {
    Box,
    ChevronDownIcon,
    ChevronLeftIcon,
    ArrowBackIcon,
} from 'native-base'
import {theme} from '../../../_config/global';
import LinearGradient from "react-native-linear-gradient";



export default function History () {
    const { flexRow } = styles;
    return(
        <View style={{ flex:1, backgroundColor: '#FFFFFF'}}>
        {/*<View colors={['#b4c8ea', '#b4c8ea', '#f7cac9']} style={{ flex: 1}}>*/}
            <Box style={flexRow}>
                {/*<ArrowBackIcon size={5} alignSelf='center' marginRight="2" />*/}
                <Box style={{backgroundColor: theme.PRIMARY_COLOR_ONE, borderWidth: 0, padding: 12, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text>Expense</Text>
                    <ChevronDownIcon style={{alignSelf: 'center', marginLeft: 10}}/>
                </Box>
            </Box>

            <ScrollView style={{ }}>
            <Box style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Box style={{backgroundColor: theme.PRIMARY_COLOR_TWO , borderColor: '#b4c8ea', borderWidth: 1, borderRadius: 8, padding: 4, paddingRight: 12, paddingLeft: 12, margin: 5, marginTop: 8, marginBottom: 8}}>
                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM, letterSpacing: 0.4}}>Daily</Text>
                </Box>

                <Box style={{backgroundColor: theme.PRIMARY_COLOR_TWO , borderColor: '#b4c8ea', borderWidth: 1, borderRadius: 8, padding: 4, paddingRight: 12, paddingLeft: 12, margin: 5, marginTop: 8, marginBottom: 8}}>
                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM}}>Weekly</Text>
                </Box>
                <Box style={{backgroundColor: theme.PRIMARY_COLOR_TWO , borderColor: '#b4c8ea', borderWidth: 1, borderRadius: 8, padding: 4, paddingRight: 12, paddingLeft: 12, margin: 5, marginTop: 8, marginBottom: 8}}>
                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM}}>Monthly</Text>
                </Box>

            </Box>

            <Box style={{borderWidth: 1, borderColor: theme.PRIMARY_COLOR_TWO, backgroundColor: '#ffffff', padding: 10, marginTop: 0}}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text>Category: Food</Text>
                    <Text style={{ color: '#e3242b'}}>RM 7.50</Text>
                </View>

            <Text style={{
                paddingTop: 10,
                fontSize: theme.FONT_SIZE_MEDIUM,
                color: 'grey'
            }}>Kawan Ajak Makan</Text>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_EXTRA_SMALL, letterSpacing: 0.2}}>#food #lunch</Text>

                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_SMALL}}>13 Feb 2022</Text>
                </View>
            </Box>


            <Box style={{borderWidth: 1, borderColor: theme.PRIMARY_COLOR_TWO, backgroundColor: '#ffffff', padding: 10, marginTop: 15}}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text>Category: Food</Text>
                    <Text style={{ color: '#008631'}}>RM 7.50</Text>
                </View>

                <Text style={{
                    paddingTop: 10,
                    fontSize: theme.FONT_SIZE_MEDIUM,
                    color: 'grey'
                }}>Kawan bagi duit</Text>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_EXTRA_SMALL, letterSpacing: 0.2}}>#food #lunch</Text>

                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_SMALL}}>13 Feb 2022</Text>
                </View>
            </Box>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    flexRow:{
        flexDirection: 'row'
    }
});
