import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';


const GOOGLE_PLACES_API_KEY = 'AIzaSyDJhM5IxG3AL4QYUyzs6cQn0LHpZZbTGLo';

export default function App() {
  const [region, setRegion] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantNames, setRestaurantNames] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permissão negada para acessar a localização');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSearchRestaurants = async () => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          key: GOOGLE_PLACES_API_KEY,
          location: `${region.latitude},${region.longitude}`,
          radius: 1500, 
          type: 'restaurant',
        },
      });

     
      const limitedRestaurants = response.data.results.slice(0, 5);
      setRestaurants(limitedRestaurants);

      
      const restaurantNames = limitedRestaurants.map(restaurant => restaurant.name);
      setRestaurantNames(restaurantNames);
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
      Alert.alert('Erro', 'Não foi possível buscar os restaurantes.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo1.png')} style={styles.logo} />
        <Text style={styles.title}>COME-COME</Text>
      </View>
      <Text style={styles.subtitle}>Pesquise onde você pode comer ou beber algo perto de você!</Text>
      <MapView
        style={styles.map}
        region={region}
      >
        {region && (
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title="Sua localização"
          />
        )}
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            title={restaurant.name}
          >
            <Image source={require('./assets/come_come.png')} style={styles.markerImage} />
          </Marker>
        ))}
      </MapView>
      <Button title="Buscar restaurantes próximos" onPress={handleSearchRestaurants} />
      <View style={styles.restaurantNamesContainer}>
        {restaurantNames.map((name, index) => (
          <Text key={index} style={styles.restaurantName}>{name}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  restaurantNamesContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  restaurantName: {
    fontSize: 16,
    marginBottom: 5,
  },
});
