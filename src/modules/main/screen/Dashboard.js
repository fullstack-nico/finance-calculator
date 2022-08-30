import React from 'react';
import {Text} from '../../../component/typography';
import {Container} from '../component';
import {
    Box,
    ChevronDownIcon,
    Divider,
} from 'native-base';


export default function Dashboard(){
    return(
        <Container>
            <Box style={{ borderWidth: 0.5, padding: 10}}>
                <Box  style={{ alignSelf: 'center', flexDirection: 'row'}}>
                    <Text>Dashboard</Text>
                    <ChevronDownIcon style={{marginLeft: 5, alignSelf: 'center'}} />
                </Box>
            </Box>

            <Box flexDirection='row' justifyContent='space-between' marginTop='5'>
                <Text>Daily Spending</Text>
                <Text>RM 10.00</Text>
            </Box>
            <Divider marginTop={2}/>
            <Box flexDirection='row' justifyContent='space-between' marginTop='2'>
                <Text>Weekly Spending</Text>
                <Text>RM 110.00</Text>
            </Box>
            <Divider marginTop={2}/>
            <Box flexDirection='row' justifyContent='space-between' marginTop='2'>
                <Text>Monthly Budget</Text>
                <Text>RM 110.00 / 500.00</Text>
            </Box>
            <Divider marginTop={2}/>

            <Text style={{marginTop: 25, alignSelf: 'center', }}>Expenses Graph</Text>

            <Box style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10}}>
                <Box style={{flex:1}}>
                    <Text style={{alignSelf: 'center'}}>11 Feb</Text>
                </Box>

                <Divider orientation="vertical"/>
                <Box style={{flex:1}}>
                    <Text style={{alignSelf: 'center'}}>Week 2</Text>
                </Box>
                <Divider orientation="vertical"/>
                <Box style={{flex:1}}>
                    <Text style={{alignSelf: 'center'}}>Day 7 - 13</Text>
                </Box>
            </Box>

        </Container>
    )
}
