import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';


import {
  View,
  Alert,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Database from "../Database";

const EntryScreen = ({ navigation }) => {
  const [name, setName] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [date, setDate] = useState()
  const [parking, setParking] = useState(null);
  const [length, setLength] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [estimatedTime, setTimeEstimated] = useState("");
  const [difficulty, setDifficulty] = useState(""); 
  const [description, setDescription] = useState(""); 

  const handleParkingSelection = (value) => {
    setParking(value);
  };

  const handleAddTodo = async () => {
    if (
      !name || 
      !location || 
      !date || 
      !parking || 
      !length || 
      !weatherForecast || 
      !estimatedTime || 
      !difficulty || 
      !description
    ){
      Alert.alert("Error", "Please enter all the required information");
      return;
    }
    await Database.addNewHike(
      name, 
      location, 
      date, 
      parking, 
      length, 
      weatherForecast, 
      estimatedTime,
      difficulty, 
      description
    );
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
    <View style={styles.label}>
      <Text>Name of the hike</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter name"
      />

      <Text>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholder="Enter location"
      />

      <Text>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={(text) => setDate(text)}
        placeholder="Enter date"
      />

      <Text>Parking Available</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButtonLabelYes}
          onPress={() => handleParkingSelection('yes')}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: parking === 'yes' ? 'green' : 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {parking === 'yes' && <View style={styles.selectedRadioButton} />}
          </View>
          <Text style={{ marginLeft: 8 }}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonLabelNo}
          onPress={() => handleParkingSelection('no')}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: parking === 'no' ? 'green' : 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {parking === 'no' && <View style={styles.selectedRadioButton} />}
          </View>
          <Text style={{ marginLeft: 8 }}>No</Text>
        </TouchableOpacity>
      </View>

      <Text>Length of the hike</Text>
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={(text) => setLength(text)}
        placeholder="Enter length"
      />

      <Text>Weather Forecast</Text>
      <Picker
        selectedValue={weatherForecast}
        onValueChange={(itemValue, itemIndex) =>
          setWeatherForecast(itemValue)
        }>
        <Picker.Item label="Sunny" value="Sunny" />
        <Picker.Item label="Rainy" value="Rainy" />
        <Picker.Item label="Cloudy" value="Cloudy" />
        <Picker.Item label="Snowy" value="Snowy" />
      </Picker>

      <Text>Time Start</Text>
      <TextInput
        style={styles.input}
        value={estimatedTime}
        onChangeText={(text) => setTimeEstimated(text)}
        placeholder="Enter time start"
      />

      <Text>Difficulty Level</Text>
      <Picker
        selectedValue={difficulty}
        onValueChange={(itemValue, itemIndex) =>
          setDifficulty(itemValue)
        }>
        <Picker.Item label="Easy" value="Easy" />
        <Picker.Item label="Moderate" value="Moderate" />
        <Picker.Item label="Difficult" value="Difficult" />
      </Picker>


      <Text>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter description"
      />

      <TouchableOpacity style={{ backgroundColor: 'green', padding: 16, borderRadius: 4 }} onPress={handleAddTodo}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Add Hike</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  addButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  radioButtonLabelYes: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  radioButtonLabelNo: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginLeft: 20
  },
  selectedRadioButton: {
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: 'green'
  }
});

export default EntryScreen;
