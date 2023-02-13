import React from "react";
import {
  Box,
  FormControl,
  NativeBaseProvider,
  Stack,
  Text,
  Input,
  Select,
  CheckIcon,
  Button,
  TextArea,
} from "native-base";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  Platform,
  SafeAreaView,
  RefreshControl,
  ScrollView,
} from "react-native";
import { API } from "../config/api";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function AddList() {
  const [date, setDate] = useState(new Date());
  const [names, setName] = useState({});
  const [categorys, setCategory] = useState({});
  const [descriptions, setDescription] = useState({});
  const [list, setList] = useState();
  const [refresh, setRefresh] = useState(false);

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(2000).then(() => setRefresh(false));
  }, []);

  const listCategory = async () => {
    try {
      const response = await API.get("/category");
      setList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listCategory();
  }, []);
  const handlerOnPress = async () => {
    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };
      const fBody = {
        name: names,
        category: categorys,
        date: moment(date).format("YYYY-MM-DD"),
        description: descriptions,
      };
      const body = JSON.stringify(fBody);
      const response = await API.post("/list", body, config);
      console.log(response.data);
      listCategory();
      alert("Berhasil");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl Refresh={refresh} OnRefresh={onRefresh} />
          }
        >
          <Box mt={44}>
            <Box ml={8}>
              <Text color={"black"} fontSize={25} fontWeight={"800"}>
                Add List
              </Text>
            </Box>
            <Box alignItems={"center"} mt={22}>
              <FormControl width={"85%"}>
                <Stack space={4} alignItems={"center"}>
                  <Input
                    size="md"
                    onChangeText={(value) => setName(value)}
                    // value={form.name}
                    p={2}
                    placeholder="Name"
                  />
                  <Select
                    name="category"
                    // selectedValue={service}
                    on
                    width={"100%"}
                    accessibilityLabel="Category"
                    placeholder="Category"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(value) => setCategory([value])}
                  >
                    {list?.map((data) => (
                      <Select.Item label={data.name} value={data._id} />
                    ))}
                  </Select>
                  <Button
                    width={"100%"}
                    onPress={showDatepicker}
                    justifyContent={"flex-start"}
                    variant="outline"
                  >
                    <Text color={"#999999"}>
                      {date ? date.toLocaleDateString() : "Select"}
                    </Text>
                  </Button>
                  <TextArea
                    h={130}
                    onChangeText={(value) => setDescription(value)}
                    // value={form.description}
                    placeholder="Description"
                  />
                </Stack>
                <Button
                  onPress={handlerOnPress}
                  backgroundColor={"#FF5555"}
                  marginTop={90}
                >
                  <Text fontWeight={"bold"} fontSize={16} color={"white"}>
                    Add List
                  </Text>
                </Button>
              </FormControl>
            </Box>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
