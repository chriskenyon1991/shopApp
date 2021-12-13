import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { globalBasket } from "./Home";

const screenWidth = Dimensions.get("window").width;
export default function Basket() {
  const [total, setTotal] = useState(0);
  let basketTotal = 0;

  const listItems = () => {
    return globalBasket.map((item, index) => {
      basketTotal += item.price * item.quantity;
      // updates state on last itteration and only if the total is diferent

      if (globalBasket.length - 1 === index && basketTotal != total) {
        setTotal(basketTotal);
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
                <Text style={styles.itemPrice}>
                  Price: £{item.price * item.quantity}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.quantity != 0) {
                      basketTotal = item.price + total;
                      setTotal(basketTotal);
                      console.log(basketTotal);
                      item.quantity--;
                    }
                  }}
                  style={{
                    width: 20,
                    height: 30,
                    backgroundColor: "red",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      alignSelf: "center",
                      fontWeight: "bold",
                    }}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    height: 30,
                    backgroundColor: "white",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ alignSelf: "center", fontSize: 16 }}>
                    {item.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 20,
                    height: 30,
                    backgroundColor: "lightgreen",
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    basketTotal = item.price + total;
                    setTotal(basketTotal);
                    console.log(basketTotal);
                    item.quantity++;
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 18,
                      alignSelf: "center",
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    });
  };

  const totalPrice = () => {
    return (
      <View
        style={{
          backgroundColor: "whitesmoke",
          margin: 10,
          padding: 20,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 10,
            marginLeft: 10,
            backgroundColor: "whitesmoke",
          }}
        >
          <Text style={{ fontSize: 20 }}>Total:</Text>
          <Text style={{ fontSize: 20 }}>{total.toFixed(2)}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ height: 10 }} />
        {listItems()}
        {totalPrice()}
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
