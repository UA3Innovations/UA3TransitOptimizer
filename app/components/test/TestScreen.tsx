import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export const TestScreen = () => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const testAPI = async () => {
        setLoading(true);
        
        try {
            const result = await fetch('http://localhost:5000/test');
            const data = await result.json();
            setResponse(data.message);
            Alert.alert('Başarılı!', data.message);
        } catch (error) {
            Alert.alert('Hata', 'API bağlantısı başarısız');
            setResponse('Bağlantı hatası');
        }
        
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Python API Test</Text>
            
            <TouchableOpacity style={styles.button} onPress={testAPI}>
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Test Et</Text>
                )}
            </TouchableOpacity>

            {response && (
                <View style={styles.responseBox}>
                    <Text style={styles.responseText}>{response}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fef2f2',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    button: {
        backgroundColor: '#3b82f6',
        padding: 15,
        borderRadius: 10,
        width: 200,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    responseBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3b82f6',
    },
    responseText: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
});