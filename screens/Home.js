import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

export let globalBasket = [];

const screenWidth = Dimensions.get("window").width;
export default function Home() {
  const [items, setItems] = useState([]);
  const [basket, setBasket] = useState([]);
  async function getItems() {
    try {
      let response = await fetch(
        `https://my-json-server.typicode.com/benirvingplt/products/products`
      );
      let json = await response.json();
      setItems(json);
    } catch {
      console.log("err");
    }
  }

  //puts products in to a list
  const listItems = () => {
    return items.map((item, index) => {
      item["quantity"] = 1;
      let button = "Add to basket";

      // cheacks if product is already in basket
      if (basket.includes(item.id)) {
        button = "Item added";
      }

      return (
        <View style={styles.itemview}>
          <View style={styles.itemContent}>
            <Image style={styles.itemImg} source={{ uri: item.img }}></Image>
            <View
              style={{
                marginLeft: 10,
                height: 200,
                justifyContent: "space-evenly",
              }}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Colour: {item.colour}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.itemPrice}>Price: £{item.price}</Text>
              </View>
              <TouchableOpacity
                disabled={basket.includes(item.id)}
                style={styles.buyButton}
                onPress={() => {
                  if (!basket.includes(item.id)) {
                    globalBasket.push(item);
                    setBasket((basket) => [...basket, item.id]);
                  }
                }}
              >
                <Text style={{ alignSelf: "center", color: "white" }}>
                  {button}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };

  // gets all products when app is first loaded
  useEffect(() => {
    if (items.length === 0) {
      getItems();
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ height: 10 }} />
        {listItems()}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  itemview: {
    width: screenWidth,
    marginBottom: 10,
  },
  itemImg: {
    height: 200,
    width: 125,
    resizeMode: "contain",
    borderRadius: 8,
  },
  itemContent: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    backgroundColor: "whitesmoke",
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    width: screenWidth - 155,
  },
  itemPrice: {
    fontSize: 16,
  },
  buyButton: {
    width: screenWidth / 3,
    height: 50,
    backgroundColor: "lightgreen",
    borderRadius: 8,
    justifyContent: "center",
  },
});
