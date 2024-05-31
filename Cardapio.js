// Cardapio.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cardapio = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Cardápio</Text>
            <Text style={styles.item}>- Prato 1: Feijão com arroz</Text>
            <Text style={styles.item}>- Prato 2: Macarrão com batata</Text>
            <Text style={styles.item}>- Prato 3: Fricassê de Frango</Text>
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
    item: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default Cardapio;
