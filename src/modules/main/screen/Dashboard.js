import React from 'react';
import {StyleSheet, useWindowDimensions } from 'react-native';
import {Text} from '../../../component/typography';
import {Container} from '../component';
import {
    Box,
    ChevronDownIcon,
    Divider,
} from 'native-base';
import {theme} from '../../../_config/global';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryLabel, VictoryVoronoiContainer} from "victory-native";

const data = [
    { datetime: 'mon', amount: 120.51, label: "120.51" },
    { datetime: 'tue', amount: 98.33, label: "98.33" },
    { datetime: 'wed', amount: 43.22 , label: "43.22" },
    { datetime: 'thu', amount: 24.01 , label: "24.01" },
    { datetime: 'fri', amount: 4.02 , label: "4.02" },
    { datetime: 'sat', amount: 54.55 , label: "54.55" },
    { datetime: 'sun', amount: 140.01 , label: "140.01" },
];

export default function Dashboard(){
    const { height, width } = useWindowDimensions();
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

            <Box style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginBottom: 20}}>
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

            <Text style={{marginBottom: -30, marginLeft: 5, fontSize: theme.FONT_SIZE_SMALL}}>Expense (RM)</Text>
            <VictoryChart
                padding={{ top: 40, bottom: 80, left: 40, right: 20 }}
                domainPadding={{x:32, y:30}}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({ datum }) => `RM: ${datum.amount}`}
                    />
                }
                width={width}
                height={300}
            >
                <VictoryLine

                    style={{
                        data: { stroke: "#87ceeb" },
                    }}
                    data={data}
                    x={"datetime"}
                    y={"amount"}


                />

                <VictoryAxis
                    label="Days"
                    style={{
                        axisLabel: { padding: 35 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    label="RM"
                    style={{
                    axisLabel: { padding: 50 },
                    }}

                />
            </VictoryChart>


        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff"
    }
});
