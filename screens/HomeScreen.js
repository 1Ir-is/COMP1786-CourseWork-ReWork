import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ToastAndroid,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Database from "../Database";
import { FAB } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Database.getHikerInformation();
        setHikes(data);
      } catch (error) {
        console.log("Error fetching todos", error);
      }
    };

    fetchData();
  }, [isFocused]);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const handleDeleteHikeInformation = async (id) => {
    await Database.deleteHikeInformation(id);
    const data = await Database.getHikerInformation();
    setHikes(data);
    showToast("Delete Successfully!");
  };

  const handleDeleteAllHikeInformation = async (id) => {
    await Database.deleteAllHikeInformation(id);
    setHikes([]);
    showToast("Delete All Successfully!");
  }

  const renderTodoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => navigation.navigate("Information Detail", { hike: item })}
    >
      <Text>{item.name}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteHikeInformation(item.id)}
      >
        <Text 
          style={styles.deleteButtonText}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={hikes}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
      />

        <View style = {styles.deleteAll}>
          <FAB
            style={styles.fab}
            icon="delete"
            label="Delete All"
            onPress={handleDeleteAllHikeInformation}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Add new hike")}
        >
          <Text style={styles.addButtonText}>Add Hike</Text>
        </TouchableOpacity>

    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
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
  deleteAll: {
    flex: 1,
    padding: 16,
    marginBottom: 15
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default HomeScreen;