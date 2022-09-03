import React from 'react';
import{StyleSheet, View} from 'react-native';
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

export default function History () {
    const { flexRow } = styles;
    return(
        <View>

            <Box style={flexRow}>
                {/*<ArrowBackIcon size={5} alignSelf='center' marginRight="2" />*/}
                <Box style={{backgroundColor: '#91a8d0', borderWidth: 0, padding: 12, flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text>Expense</Text>
                    <ChevronDownIcon style={{alignSelf: 'center', marginLeft: 10}}/>
                </Box>
            </Box>

            <Box style={{ flexDirection: 'row', justifyContent: 'center'}}>
                <Box style={{backgroundColor: '#ffdcdb' , borderColor: '#f7cac9', borderWidth: 1, borderRadius: 8, padding: 4, paddingRight: 12, paddingLeft: 12, margin: 5, marginTop: 8, marginBottom: 8}}>
                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM, letterSpacing: 0.4}}>Daily</Text>
                </Box>

                <Box style={{backgroundColor: '#ffdcdb' , borderColor: '#f7cac9', borderWidth: 1, borderRadius: 8, padding: 4, paddingRight: 12, paddingLeft: 12, margin: 5, marginTop: 8, marginBottom: 8}}>
                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM}}>Weekly</Text>
                </Box>
                <Box style={{backgroundColor: '#ffdcdb' , borderColor: '#f7cac9', borderWidth: 1, borderRadius: 8, padding: 4, paddingRight: 12, paddingLeft: 12, margin: 5, marginTop: 8, marginBottom: 8}}>
                    <Text style={{fontSize: theme.FONT_SIZE_MEDIUM}}>Monthly</Text>
                </Box>

            </Box>

            <Box style={{borderWidth: 0, backgroundColor: '#fefefe', padding: 10, marginTop: 0}}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text>Category: Food</Text>
                    <Text style={{ color: '#ff0000'}}>RM 7.50</Text>
                </View>

            <Text style={{
                paddingTop: 10,
                fontSize: theme.FONT_SIZE_MEDIUM,
                color: 'grey'
            }}>Kawan Ajak Makan</Text>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_EXTRA_SMALL}}>#food #lunch</Text>

                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_SMALL}}>13 Feb 2022</Text>
                </View>
            </Box>

            <Box style={{borderWidth: 1, borderColor: '#b4c8ea', backgroundColor: '#b4c8ea', padding: 10, marginTop: 15}}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text>Category: Food</Text>
                    <Text style={{ color: '#00836d'}}>RM 7.50</Text>
                </View>

                <Text style={{
                    paddingTop: 10,
                    fontSize: theme.FONT_SIZE_MEDIUM,
                    color: 'grey'
                }}>Kawan bagi duit</Text>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_EXTRA_SMALL}}>#food #lunch</Text>

                    <Text style={{ paddingTop: 15, fontSize: theme.FONT_SIZE_SMALL}}>13 Feb 2022</Text>
                </View>

            </Box>

        </View>
    )
}

const styles = StyleSheet.create({
    flexRow:{
        flexDirection: 'row'
    }
});
