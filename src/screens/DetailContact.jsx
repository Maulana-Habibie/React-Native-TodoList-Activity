import { StyleSheet, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DetailContact({ route }) {
  let id = route.params;
  console.log(route);

  const [detail, setDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getComment();
  }, []);

  const getComment = async () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.kontenbase.com/query/api/v1/7ea55a08-b5c1-43f7-b707-912615c10e3a/todoContact/${id}`
      )
      .then((res) => {
        setDetail(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <View style={styles.box} key={detail.id}>
      <Text style={styles.text}>Note</Text>
      <Text style={styles.input}>{detail.note}</Text>

      <Text style={styles.text}>Date</Text>
      <Text style={styles.input}>{detail.date}</Text>

      <Text style={styles.text}>Activites</Text>
      <Text style={styles.input}>{detail.activity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 16,
  },
  input: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
