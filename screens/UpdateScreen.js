import React, { useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import Database from "../Database";

const UpdateScreen = ({ navigation, route }) => {
  const { hike } = route.params;
  const [name, setName] = useState(hike.name);
  const [location, setLocation] = useState(hike.location);
  const [date, setDate] = useState(hike.date);
  const [parking, setParking] = useState(hike.parking);
  const [length, setLength] = useState(hike.length);
  const [weatherForecast, setWeatherForecast] = useState(hike.weatherForecast);
  const [estimatedTime, setTimeEstimated] = useState(hike.estimatedTime);
  const [difficulty, setDifficulty] = useState(hike.difficulty);
  const [description, setDescription] = useState(hike.description);


  const handleSave = async () => {
    if (
      !name || 
      !location || 
      !date || 
      !parking || 
      !length || 
      !weatherForecast || 
      !estimatedTime || 
      !difficulty 
    ){
      Alert.alert("Validation Error", "Please fill in all fields before saving.");
      return;
    }
    Alert.alert(
      "Are you sure you want to update?",
      "Your information will be updated.",
      [
        {
          text: "Cancel",
          onPress: () => {
            // Người dùng bấm Cancel, không làm gì cả
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const updatedName = name;
              const updatedLocation = location;
              const updatedDate = date;
              const updatedParking = parking;
              const updatedLength = length;
              const updatedWeatherForecast = weatherForecast;
              const updatedEstimatedTime = estimatedTime;
              const updatedDifficulty = difficulty;
              const updatedDescription = description;
  
              await Database.updateHikeInformation(
                hike.id,
                updatedName,
                updatedLocation,
                updatedDate,
                updatedParking,
                updatedLength,
                updatedWeatherForecast,
                updatedEstimatedTime,
                updatedDifficulty,
                updatedDescription
              );

              Alert.alert("Update Successful", "Your information has been updated successfully.", [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Information Detail", {
                      hike: {
                        ...hike,
                        name: updatedName,
                        location: updatedLocation,
                        date: updatedDate,
                        parking: updatedParking,
                        length: updatedLength,
                        weatherForecast: updatedWeatherForecast,
                        estimatedTime: updatedEstimatedTime,
                        difficulty: updatedDifficulty,
                        description: updatedDescription,
                      },
                    });
                  },
                },
              ]);
            } catch (error) {
              console.error("Error updating hike information:", error);
            }
          },
        },
      ]
    );
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name of the hike <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Location <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />
      <Text style={styles.label}>Date of the hike <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter date"
      />
      <Text style={styles.label}>Parking Available <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={parking}
        onChangeText={setParking}
        placeholder="Enter parking"
      />
      <Text style={styles.label}> Length of the hike <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={length}
        onChangeText={setLength}
        placeholder="Enter length"
      />
      <Text style={styles.label}>Weather Forecast <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={weatherForecast}
        onChangeText={setWeatherForecast}
        placeholder="Enter weather forecast"
      />
      <Text style={styles.label}>Time Estimated <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={estimatedTime}
        onChangeText={setTimeEstimated}
        placeholder="Enter time estimated"
      />
      <Text style={styles.label}>Difficulty Level <Text style={{ color: 'red' }}>*</Text></Text>
      <TextInput
        style={styles.input}
        value={difficulty}
        onChangeText={setDifficulty}
        placeholder="Enter difficulty level"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleSave}>
        <Text style={styles.updateButtonText}>Save</Text>
      </TouchableOpacity>

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
  updateButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold",
  }
});

export default UpdateScreen;