import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditContact({ navigation, route }) {
  let id = route.params;
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [form, setForm] = useState({
    note: "",
    date: "",
    activity: "",
  });

  useEffect(() => {});

  const isSubmit = () => {
    if (note && date && activity) {
      const contact = {
        note: note,
        date: date,
        activity: activity,
      };
      axios
        .patch(
          `https://api.kontenbase.com/query/api/v1/7ea55a08-b5c1-43f7-b707-912615c10e3a/todoContact/${id}`,
          contact
        )
        .then((res) => {
          Alert.alert("Success", "Data Saved");
          let data = { ...res.data };
          console.log(data);
          navigation.replace("Home");
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      Alert.alert("Error", "Input All Data");
    }
  };

  return (
    <View style={styles.box}>
      <Text style={styles.formLabel}>Note</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Note Acitivity"
        value={note}
        onChangeText={(e) => setNote(e)}
      />

      <Text style={styles.formLabel}>Date</Text>
      <TextInput
        style={styles.formInput}
        placeholder="Date"
        keyboardType="number-pad"
        value={date}
        onChangeText={(e) => setDate(e)}
      />

      <Text style={styles.formLabel}>For Activity</Text>
      <TextInput
        style={styles.formInputArea}
        placeholder="Detail Activity"
        multiline={true}
        numberOfLines={4}
        value={activity}
        onChangeText={(e) => setActivity(e)}
      />

      <TouchableOpacity style={styles.btn} onPress={isSubmit}>
        <Text style={styles.btnText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    padding: 30,
    alignContent: "center",
    justifyContent: "center",
  },
  formLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 5,
    marginBottom: 15,
  },
  formInputArea: {
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 5,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  btn: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 5,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
