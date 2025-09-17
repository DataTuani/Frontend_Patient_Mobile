import React, { useState } from "react";
import { View, Text, Pressable, Button, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalColors } from "../theme/theme";

const hours = [
    { id: "1", label: "8:00 AM - 09:00 AM" },
    { id: "2", label: "9:00 AM - 10:00 AM" },
    { id: "3", label: "10:00 AM - 11:00 AM" },
    { id: "4", label: "11:00 AM - 12:00 PM" },
    { id: "5", label: "1:00 PM - 02:00 PM" },
    { id: "6", label: "2:00 PM - 03:00 PM" },
    { id: "7", label: "3:00 PM - 04:00 PM" },
    { id: "8", label: "4:00 PM - 05:00 PM" },
];

export const CalendarHours = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);

    // Fechas con cita ya hecha
    const [bookedDates, setBookedDates] = useState<string[]>([]);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);


    const reserveHour = () => {
        if (selectedDate && selectedHour) {
            const dateKey = selectedDate.toDateString();

            // Si ya hay cita ese día, no permitir otra
            if (bookedDates.includes(dateKey)) {
                alert("⚠️ Ya tienes una cita para este día");
                return;
            }

            setBookedDates((prev) => [...prev, dateKey]);
            alert(`✅ Cita reservada el ${dateKey}`);

        } else {
            alert("⚠️ Selecciona fecha y hora primero");
        }
    };

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        setSelectedHour(null); // reset cuando cambia la fecha
        hideDatePicker();
    };

    return (
        <View style={{ flex: 1, padding: 20, maxHeight: 500 }}>
            <Pressable onPress={showDatePicker} style={styles.pressable_style} >
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: globalColors.light }}>Seleccione una fecha</Text>
            </Pressable>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date()} // bloquear fechas pasadas
            />

            {selectedDate && (
                <>
                    <Text style={styles.title}>
                        Fecha: {selectedDate.toLocaleDateString()}
                    </Text>
                    <Text style={styles.subtitle}>Hora disponible</Text>
                    <View style={styles.hoursContainer}>
                        {hours.map((hour) => {
                            const dateKey = selectedDate.toDateString();
                            const isBooked = bookedDates.includes(dateKey); // Si ya hay cita, bloquea todas
                            const isSelected = selectedHour === hour.id;
                            return (
                                <Pressable
                                    key={hour.id}
                                    disabled={isBooked}
                                    style={[
                                        styles.hourBox,
                                        isSelected && styles.hourBoxSelected,
                                        isBooked && styles.hourBoxDisabled,
                                    ]}
                                    onPress={() => setSelectedHour(hour.id)}
                                >
                                    <Text
                                        style={{
                                            color: isBooked
                                                ? "#999"
                                                : isSelected
                                                    ? "#fff"
                                                    : "#000",
                                            textDecorationLine: isBooked ? "line-through" : "none",
                                        }}
                                    >
                                        {hour.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                    <Text style={styles.title}>
                        Hora seleccionada: {selectedHour ? hours.find(h => h.id === selectedHour)?.label : ""}
                    </Text>
                    <Pressable onPress={reserveHour} style={styles.pressable_style} >
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: globalColors.light }}>Reservar</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    pressable_style: {
        padding: 10,
        backgroundColor: globalColors.tertiary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    title: { fontSize: 16, marginVertical: 10, fontWeight: "bold" },
    subtitle: { fontSize: 18, marginBottom: 20, marginTop: 10, fontWeight: "bold" },
    hoursContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    hourBox: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        minWidth: 120,
        alignItems: "center",
    },
    hourBoxSelected: { backgroundColor: "#007bff", borderColor: "#007bff" },
    hourBoxDisabled: { backgroundColor: "#eee", borderColor: "#ccc" },
});
