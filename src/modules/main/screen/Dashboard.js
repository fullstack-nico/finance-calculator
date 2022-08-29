import React from 'react';
import {Text} from '../../../component/typography';
import {Container} from '../component';
import {
    Box,
    ChevronDownIcon,
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

            <Box flexDirection='row' justifyContent='space-between' marginTop='5'>
                <Text>Weekly Spending</Text>
                <Text>RM 110.00</Text>
            </Box>

            <Box flexDirection='row' justifyContent='space-between' marginTop='5'>
                <Text>Monthly Budget</Text>
                <Text>RM 110.00 / 500.00</Text>
            </Box>

            <Text style={{marginTop: 20, alignSelf: 'center', }}>Expenses Graph</Text>
        </Container>
    )
}
