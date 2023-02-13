// import { Pressable } from "react-native";
import * as React from "react";
import { Box, NativeBaseProvider, Text, Image, Pressable } from "native-base";
import { StyleSheet } from "react-native";
// import Register from "./Register";

export default function Home({ navigation }) {
  return (
    <NativeBaseProvider style={styles.Head}>
      <Box style={styles.Container}>
        <Image
          source={require("../image/homeimg.png")}
          style={{ width: 228, height: 258 }}
          alt="home"
        />
        <Text
          fontSize={35}
          style={{
            // fontSize: 35,
            fontWeight: "bold",
            color: "#000000",
            // backgroundColor: "blue",
            // zIndex: 3,
            // marginTop: 100,
          }}
        >
          Ways <Text style={{ color: "#B82020" }}>To</Text>
          <Text style={{ color: "#FF5555" }}>DO</Text>
        </Text>

        <Text style={{ width: 280, textAlign: "center", marginTop: 23 }}>
          Write your activity and finish your activity. Fast, Simple and Easy to
          Use
        </Text>

        <Box marginTop={90}>
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={styles.PressLog}
          >
            <Text style={{ fontSize: 18, color: "white", fontWeight: "800" }}>
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={styles.PressReg}
          >
            <Text style={{ fontSize: 18, color: "white", fontWeight: "800" }}>
              Register
            </Text>
          </Pressable>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Head: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  PressLog: {
    width: 310,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#FF5555",
    alignItems: "center",
    justifyContent: "center",
  },
  PressReg: {
    width: 310,
    height: 40,
    borderRadius: 5,
    backgroundColor: "darkgrey",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
