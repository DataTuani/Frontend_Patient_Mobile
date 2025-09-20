import React from 'react'
import { View, Text, StyleSheet } from 'react-native';


interface StepperProps {
    currentStep: number;
    totalSteps?: number;
}

export const RegisterStepper = ({
    currentStep,
    totalSteps = 3
}: StepperProps) => {
    return (
        <View style={styles.stepsContainer}>
            {Array.from({ length: totalSteps }, (_, i) => {
                const step = i + 1;
                const isCompleted = step < currentStep; 
                const isActive = step === currentStep;//paso actual
                return (
                    <React.Fragment key={step}>
                        <View
                            style={[styles.circle,
                            { backgroundColor: isCompleted || isActive ? "#007ACC" : "#E0E0E0" }
                            ]}
                        >
                            <Text
                                style={[styles.circleText,
                                { color: isCompleted ||isActive ? "white" : "black" }
                                ]}
                            >{step}</Text>
                        </View>
                        {step < totalSteps && <View style={[styles.line,{
                            backgroundColor: step < currentStep ? '#007ACC' : '#E0E0E0'
                        }]} />}
                    </React.Fragment>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    stepsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: "center"
    },
    circleText: {
        fontWeight: "bold",
        fontSize: 16
    },

    line: {
        height: 2,
        width: 40,
        backgroundColor: "#ccc"
    }
})