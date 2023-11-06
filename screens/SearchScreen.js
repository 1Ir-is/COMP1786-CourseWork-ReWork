import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("Searching for: " + searchText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Enter search keyword"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearch} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchBox: {
    width: 335,
    height: 32,
    top: 145,
    left: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: "100%",
    borderWidth: 0,
  },
  buttonContainer: {
    width: 335, 
    top: 10,
    alignItems: "center", 
  },
  button: {
    width: "100%", 
  },
});

export default SearchScreen;
