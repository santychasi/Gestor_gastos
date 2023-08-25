import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Gasto from "./Gasto";

const ListadoGastos = ({ gastos, setModal, setGasto, filtro, gastoFiltrados }) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Gastos</Text>

            {filtro ? (
                gastoFiltrados && gastoFiltrados.length > 0 ? (
                    gastoFiltrados.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setModal={setModal}
                            setGasto={setGasto}
                        />
                    ))
                ) : (
                    <Text style={styles.noGastos}>No hay gastos</Text>
                )
            ) : (
                gastos.map(gasto => (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setModal={setModal}
                        setGasto={setGasto}
                    />
                ))
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        marginTop: 10,
        marginBottom: 100
    },
    titulo: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noGastos: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
});

export default ListadoGastos;
