import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  Box,
  FormControl,
  Input,
  NativeBaseProvider,
  Stack,
  Text,
  Button,
  HStack,
} from "native-base";
import { useEffect, useState } from "react";
import { API } from "../config/api";

export default function AddCategory() {
  const [form, setForm] = useState({});
  const [list, setList] = useState();
  const handlerOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  console.log(form);
  const handlerOnPress = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      console.log(body);
      const response = await API.post("/category", body, config);
      listCategory();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const listCategory = async () => {
    try {
      const response = await API.get("/category");
      console.log(response.data);
      setList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listCategory();
  }, []);

  return (
    <NativeBaseProvider>
      <Box mt={44}>
        <Box ml={8}>
          <Text color={"black"} fontSize={25} fontWeight={"800"}>
            Add Category
          </Text>
        </Box>
        <Box alignItems={"center"} mt={22} fontSize={25} fontWeight={"800"}>
          <FormControl width={"85%"}>
            <Stack space={4} alignItems={"center"}>
              <Input
                size="md"
                onChangeText={(value) => handlerOnChange("name", value)}
                p={2}
                value={form.name}
                placeholder="Name"
              />
            </Stack>
            <Button
              onPress={handlerOnPress}
              backgroundColor={"#FF5555"}
              marginTop={26}
            >
              <Text fontWeight={"bold"} fontSize={16} color={"white"}>
                Add Category
              </Text>
            </Button>
          </FormControl>
        </Box>
      </Box>
      <Box ml={8} mt={68}>
        <Text color={"black"} fontSize={25} fontWeight={"800"}>
          List Category
        </Text>
        <HStack
          space={3}
          mt={5}
          style={{ flexWrap: "wrap" }}
          width={300}
        >
          {list?.map((data) => (
            <Box p={2} bg={"#81C8FF"} rounded={5} mt={2}>
              <Text color={"white"} fontSize={10}>
                {data.name}
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
