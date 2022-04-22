import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function CardContact({ item, navigation, delData }) {
  return (
    <TouchableOpacity
      style={styles.boxCard}
      key={item._id}
      onPress={() => navigation.navigate("DetailActivity", item._id)}
    >
      <View>
        <Text style={styles.name}>{item.note}</Text>
        <Text style={styles.nomor}>Date : {item.date}</Text>
      </View>
      <View style={styles.icons}>
        <FontAwesomeIcon
          style={styles.iconss}
          icon={faEdit}
          color={"orange"}
          size={30}
          onPress={() => navigation.navigate("EditActivity", item._id)}
        />
        <FontAwesomeIcon
          icon={faTimes}
          color={"red"}
          size={30}
          onPress={() => delData(item._id)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boxCard: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 4,
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
  },
  nomor: {
    color: "grey",
    fontSize: 14,
  },
  icons: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconss: {
    marginRight: 10,
  },
});
