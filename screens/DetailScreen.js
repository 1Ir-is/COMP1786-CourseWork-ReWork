import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from "react-native";

const DetailScreen = ({ route, navigation }) => {
  const { hike } = route.params;

  const handleUpdate = () => {
    navigation.navigate("Update Information", { hike });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{hike.name}</Text>
      </View>

      <Text style={styles.label}>Location:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{hike.location}</Text>
      </View>

      <Text style={styles.label}>Date:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{hike.date}</Text>
      </View>

      <Text style={styles.label}>Parking:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{hike.parking}</Text>
      </View>

      <Text style={styles.label}>Length:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{hike.length}</Text>
      </View>

      <Text style={styles.label}>Difficulty Level:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{hike.difficulty}</Text>
      </View>

      <Text style={styles.label}>Description:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{hike.description}</Text>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text> 
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
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 16,
  },
  inputText: {
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
  },
});

export default DetailScreen;
