import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import globalStyles from "../styles";

const NuevoPresupuesto = ({
    handleNuevoPresupuesto,
    setPresupuesto,
    presupuesto
}) => {
    const handlePresupuestoChange = (text) => {
        // Validar que el texto ingresado sea un número o esté vacío
        if (text === "" || (!isNaN(parseFloat(text)) && isFinite(text))) {
            setPresupuesto(text);
        }
    };

    return (
        <View style={style.contenedor}>
            <Text style={style.label}>Definir Presupuesto</Text>
            <TextInput
                keyboardType="numeric"
                placeholder="Agrega tu presupuesto: Ej. 300"
                style={style.input}
                value={presupuesto === 0 ? "" : presupuesto.toString()}
                onChangeText={handlePresupuestoChange}
            />

            <Pressable
                style={style.boton}
                onPress={() =>
                    handleNuevoPresupuesto(presupuesto)}
            >
                <Text style={style.botonTexto}>Agregar Presupuesto</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contenedor: {
        ...globalStyles.contenedor
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    boton: {
        marginTop: 30,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10
    },
    botonTexto: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default NuevoPresupuesto;
