import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  // State variables
  const [name, setName] = useState(""); 
  const [location, setLocation] = useState(""); 
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [parking, setParking] = useState(null);
  const [length, setLength] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [estimatedTime, setTimeEstimated] = useState("");
  const [showTime, setShowTime] = useState(false); // Additional state for time picker
  const [difficulty, setDifficulty] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [dateButtonText, setDateButtonText] = useState("Show date picker!");

  // Function to handle parking selection
  const handleParkingSelection = (value) => {
    setParking(value);
  };

  // Date picker change handler
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);

    // Format date to display on the button
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    setDateButtonText(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // Show date picker
  const showDatepicker = () => {
    showMode('date');
  };

  // Show time picker
  const showTimepicker = () => {
    showMode('time');
    setShowTime(true); // Show time picker
  };

  // Function to handle the addition of a new hike
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

    // Validate name
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      Alert.alert("Error", "Please enter a valid name for the hike!");
      return;
    }

    // Validate location
    const locationRegex = /^[A-Za-z0-9\s]+$/;
    if (!locationRegex.test(location)) {
      Alert.alert("Error", "Please enter a valid location (letters and numbers only)!");
      return;
    }


    // Convert date to ISO string
    const formattedDate = date.toISOString(); // Convert date to ISO string
    const time = new Date(estimatedTime).toTimeString().split(' ')[0]; // Convert estimatedTime to time

    // Combine the date and time together
    const dateTime = `${formattedDate.slice(0, 10)}T${time}`;
    
    // Call the function to add a new hike to the database
    await Database.addNewHike(
      name, 
      location, 
      formattedDate,
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

      <Text>Date of the hike</Text>
        <Button onPress={showDatepicker} title={dateButtonText} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

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
        keyboardType="numeric"
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
      <Button onPress={showTimepicker} title={estimatedTime ? estimatedTime : 'Select Time'} />
          {showTime && (
            <DateTimePicker
              value={new Date()} // Current time value
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedTime) => {
                if (event.type === 'set') {
                  setShowTime(false);
                  const time = selectedTime.toLocaleTimeString().split(' ')[0]; // Format time
                  setTimeEstimated(time);
                }
              }}
            />
          )}

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
