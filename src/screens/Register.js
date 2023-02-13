import * as React from "react";
import {
  Box,
  NativeBaseProvider,
  Image,
  Text,
  FormControl,
  Stack,
  Input,
  Button,
  Link,
  HStack,
} from "native-base";
import { Alert, StyleSheet } from "react-native";
import { API } from "../config/api";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Register({ navigation }) {
  const [form, setForm] = useState({});
  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  console.log(form);

  const handleOnPress = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      console.log(body);
      const response = await API.post("/auth/register", body, config);
      console.log(response);
      if (response) {
        await AsyncStorage.setItem("token", response.data.token);
      }
      alert("Berhasil");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert("Gagal");
    }
  };

  return (
    <NativeBaseProvider>
      <Box alignItems={"center"}>
        <Box alignItems={"center"} mt={10}>
          <Image
            source={require("../image/logreg.png")}
            alt="iconlogreg"
            style={{ width: 257, height: 183 }}
          />
        </Box>
        <Box width={"90%"} mt={2}>
          <Text fontSize={25} fontWeight={"800"}>
            Register
          </Text>
          <FormControl marginTop={5}>
            <Stack space={4}>
              <Input
                size="md"
                p={2}
                placeholder="Email"
                onChangeText={(value) => handleOnChange("email", value)}
                value={form.email}
              />
              <Input
                size="md"
                p={2}
                placeholder="Name"
                onChangeText={(value) => handleOnChange("firstName", value)}
                value={form.firstName}
              />
              <Input
                size="md"
                type="password"
                p={2}
                placeholder="Password"
                onChangeText={(value) => handleOnChange("password", value)}
                value={form.password}
              />
            </Stack>
            <Button
              onPress={handleOnPress}
              backgroundColor={"#FF5555"}
              marginTop={10}
            >
              <Text fontWeight={"bold"} fontSize={16} color={"white"}>
                Register
              </Text>
            </Button>
          </FormControl>
          <HStack justifyContent="center" mt={5}>
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              Joined us before?{" "}
            </Text>
            <Link
              _text={{
                color: "#FF5555",
                bold: true,
                fontSize: "sm",
                textDecoration: "none",
              }}
              //   href="#"
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Link>
          </HStack>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  iconreg: {
    alignItems: "center",
  },
});
