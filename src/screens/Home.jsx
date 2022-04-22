import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import CardContact from "../components/CardContact";
import axios from "axios";

export default function Home({ navigation }) {
  const [isContact, setIsContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fectData();
  }, []);

  const fectData = () => {
    setIsLoading(true);
    axios
      .get(
        "https://api.kontenbase.com/query/api/v1/7ea55a08-b5c1-43f7-b707-912615c10e3a/todoContact"
      )
      .then((res) => {
        setIsContact(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  let searchFilt = isContact.filter((item) => {
    return item.note.toLowerCase().includes(search.toLowerCase());
  });

  const delData = (id) => {
    Alert.alert(
      "Hapus",
      "Anda Yakin akan menghapus data ini ?",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",

          onPress: () => {
            axios.delete(
              `https://api.kontenbase.com/query/api/v1/7ea55a08-b5c1-43f7-b707-912615c10e3a/todoContact/${id}`
            );
            fectData();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>List Your Activity</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          style={styles.searchTxt}
          onChangeText={(e) => setSearch(e)}
        />
        <FontAwesomeIcon icon={faSearch} color={"orange"} size={30} />
      </View>

      <ScrollView style={styles.listContact}>
        {searchFilt.length > 0 ? (
          searchFilt.map((item, index) => (
            <CardContact
              item={item}
              key={index}
              navigation={navigation}
              delData={delData}
            />
          ))
        ) : (
          <Text> Daftar Kosong</Text>
        )}
      </ScrollView>

      <View style={styles.plusBox}>
        <TouchableOpacity
          style={styles.plusBtn}
          onPress={() => navigation.navigate("AddActivity")}
        >
          <FontAwesomeIcon icon={faPlus} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  header: {
    marginHorizontal: 30,
    paddingTop: 50,
  },
  search: {
    marginHorizontal: 30,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
  },
  searchTxt: {
    fontSize: 20,
    fontWeight: "bold",
    width: "90%",
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  listContact: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  plusBox: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 25,
  },
  plusBtn: {
    backgroundColor: "skyblue",
    padding: 20,
    borderRadius: 50,
    elevation: 6,
  },
});
