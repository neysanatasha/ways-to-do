import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  NativeBaseProvider,
  Text,
  Image,
  FormControl,
  Stack,
  Input,
  Button,
  HStack,
  Link,
} from "native-base";
import { useState } from "react";
import { API } from "../config/api";

export default function Login({ logCheck }) {
  // console.log("surya halo", props);
  // console.log(title);
  console.log("ini logCheck" + logCheck());

  const [form, setForm] = useState({});

  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnPress = async () => {
    // const { logCheck } = props;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      const response = await API.post("/auth/login", body, config);
      // console.log(response.data);
      if (response) {
        await AsyncStorage.setItem("token", response.data.token);
        logCheck();
      }
      alert("Berhasil Login");
      // navigation.navigate("MyTab");
    } catch (error) {
      console.log(error);
      alert("Tidak Bisa Login");
    }
  };

  return (
    <NativeBaseProvider>
      <Box alignItems={"center"} mt={10}>
        <Box alignItems={"center"}>
          <Image
            source={require("../image/logreg.png")}
            alt="iconlogreg"
            style={{ width: 257, height: 183 }}
          />
        </Box>
        <Box width={"90%"}>
          <Text fontSize={25} fontWeight={"800"} marginTop={50}>
            Login
          </Text>
          <FormControl mt={5}>
            <Stack space={4}>
              <Input
                size="md"
                p={2}
                placeholder="Email"
                onChangeText={(value) => handleOnChange("email", value)}
              />
              <Input
                size="md"
                type="password"
                p={2}
                placeholder="Password"
                onChangeText={(value) => handleOnChange("password", value)}
              />
            </Stack>
            <Button
              backgroundColor={"#FF5555"}
              marginTop={10}
              onPress={handleOnPress}
            >
              <Text fontWeight={"bold"} fontSize={16} color={"white"}>
                Login
              </Text>
            </Button>
          </FormControl>
          <HStack justifyContent="center" mt={5}>
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              New Users?{" "}
            </Text>
            <Link
              _text={{
                color: "#FF5555",
                bold: true,
                fontSize: "sm",
                textDecoration: "none",
              }}
              //   href="Register"
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Link>
          </HStack>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}
