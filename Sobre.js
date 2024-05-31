// SobreRestaurante.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Sobre = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Sobre o Restaurante</Text>
            <Text style={styles.info}>Endereço: Rua Principal, 123</Text>
            <Text style={styles.info}>Telefone: (12) 3456-7890</Text>
            <Text style={styles.info}>Horário de Funcionamento: Seg-Sex: 10h às 22h, Sáb-Dom: 11h às 23h</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Sobre;
