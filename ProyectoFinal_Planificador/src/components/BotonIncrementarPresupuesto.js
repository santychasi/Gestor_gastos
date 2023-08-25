import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const BotonIncrementarPresupuesto = ({ incrementarPresupuesto, resetearApp }) => {
    return (
        <View>
            <Pressable
                onPress={incrementarPresupuesto}
                style={styles.boton}
            >
                <Text style={styles.textoBoton}>Incrementar Presupuesto</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#DB2777',
        padding: 10,
        marginBottom: 10,  // Agregamos un pequeño espacio entre los botones
        borderRadius: 5,
    },
    textoBoton: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default BotonIncrementarPresupuesto;
