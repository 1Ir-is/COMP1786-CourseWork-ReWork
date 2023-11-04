import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Database from "../Database";

const EntryScreen = ({ navigation }) => {
  const [name, setName] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [date, setDate] = useState(""); 
  const [parking, setParking] = useState(""); 
  const [length, setLength] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [estimatedTime, setTimeEstimated] = useState("");
  const [difficulty, setDifficulty] = useState(""); 
  const [description, setDescription] = useState(""); 

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

      <Text style={styles.label}>Name:</Text> 
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />

      <Text style={styles.label}>Location:</Text> 
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />

      <Text style={styles.label}>Date:</Text> 
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter date"
      />

      <Text style={styles.label}>Parking:</Text> 
      <TextInput
        style={styles.input}
        value={parking}
        onChangeText={setParking}
        placeholder="Enter parking"
      />

      <Text style={styles.label}>Length:</Text> 
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={setLength}
        placeholder="Enter length"
      />

      <Text style={styles.label}>Weather Forecast:</Text> 
      <TextInput
        style={styles.input}
        value={weatherForecast}
        onChangeText={setWeatherForecast}
        placeholder="Enter weather forecast"
      />

      <Text style={styles.label}>Time Estimated:</Text> 
      <TextInput
        style={styles.input}
        value={estimatedTime}
        onChangeText={setTimeEstimated}
        placeholder="Enter time estimated"
      />

      <Text style={styles.label}>Difficulty Level:</Text> 
      <TextInput
        style={styles.input}
        value={difficulty}
        onChangeText={setDifficulty}
        placeholder="Enter difficulty level"
      />

      <Text style={styles.label}>Description:</Text> 
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />


      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonText}>Add Hike</Text> 
      </TouchableOpacity>
    </ScrollView >
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
});

export default EntryScreen;
