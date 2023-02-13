import {
  Box,
  NativeBaseProvider,
  Text,
  Image,
  VStack,
  HStack,
  Input,
  Stack,
  Select,
  CheckIcon,
  Checkbox,
  Button,
  ScrollView,
  Pressable,
  Menu,
} from "native-base";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config/api";
// const Category = () => {
//   const [service, setService] = useState("");
//   return (

//   );
// };

const Status = () => {
  const [status, setStatus] = useState("");
  return (
    <Select
      selectedValue={status}
      width={98}
      accessibilityLabel="Status"
      placeholder="Status"
      _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />,
      }}
      mt={1}
      onValueChange={(itemValue) => setStatus(itemValue)}
    >
      <Select.Item label="UX Research" value="ux" />
      <Select.Item label="Web Development" value="web" />
      <Select.Item label="Cross Platform Development" value="cross" />
      <Select.Item label="UI Designing" value="ui" />
      <Select.Item label="Backend Development" value="backend" />
    </Select>
  );
};

export default function ListTodo({ navigation, logCheck }) {
  console.log(logCheck());
  const [date, setDate] = useState(new Date());
  const [logout, setLogout] = useState();
  const [course, setCourse] = useState();
  const [listCategory, setListCategory] = useState();
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState();

  const checkList = async () => {};
  console.log(check);

  let searchChange = (e) => {
    let lowerCase = e;
    // let testing = e.target;
    console.log(lowerCase);
    setSearch(lowerCase);
  };

  const searchFilter = course?.filter((e) => {
    if (search === "") {
      return e;
    } else {
      return e.name.toLowerCase().includes(search);
    }
  });

  const category = async () => {
    try {
      const response = await API.get("/category");
      setListCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    category();
  }, []);

  const listCourse = async () => {
    try {
      const response = await API.get("/list?$lookup=*");
      setCourse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listCourse();
  }, []);

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

  const handleLogout = async () => {
    try {
      const response = await API.post("/auth/logout");
      console.log("ini logout" + response);
      if (response) {
        await AsyncStorage.removeItem("token");
      }
      navigation.navigate("Home");
      logCheck();
    } catch (error) {
      console.log(error);
      console.log("ini logout");
      await AsyncStorage.removeItem("token");
      logCheck();
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box alignItems={"center"}>
          <Box width={"90%"} mt={20}>
            <HStack justifyContent={"space-between"}>
              <VStack>
                <Text fontWeight={"bold"} fontSize={"25"}>
                  Hi Khafidz
                </Text>
                <Text fontSize={12} color={"#FF5555"}>
                  {/* {course.length} List */}
                </Text>
              </VStack>
              <Menu
                shadow={2}
                w="190"
                mt={10}
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
                      <Image
                        source={require("../image/profile.png")}
                        alt="profile"
                        style={{ width: 50 }}
                      />
                    </Pressable>
                  );
                }}
                marginBottom={50}
              >
                <Menu.Item onPress={handleLogout}>Logout</Menu.Item>
              </Menu>
            </HStack>
            <VStack mt={30}>
              <Input
                onChangeText={(value) => searchChange(value)}
                size="md"
                p={2}
                placeholder="Search List..."
              />
              <HStack space={4} mt={3}>
                <Button
                  leftIcon={<Fontisto name="date" size={12} color="black" />}
                  width={"95"}
                  onPress={showDatepicker}
                  variant="outline"
                  justifyContent={"flex-start"}
                >
                  <Text color={"#999999"}>
                    {date ? date.toLocaleDateString() : "Select"}
                  </Text>
                </Button>
                {/* <Input
                size="md"
                p={2}
                placeholder={date ? date.toLocaleDateString() : "Select"}
                width={95}
              /> */}
                <Select
                  // selectedValue={service}
                  width={98}
                  accessibilityLabel="Category"
                  placeholder="Category"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  // onValueChange={(itemValue) => setService(itemValue)}
                >
                  {listCategory?.map((data) => (
                    <Select.Item label={data.name} value={data.name} />
                  ))}
                </Select>
                <Status />
              </HStack>
            </VStack>

            <VStack>
              {/* Looping di sini yaaa */}
              {searchFilter?.map((data) => (
                <HStack
                  bg={"#DAEFFF"}
                  space={3}
                  p={2}
                  pl={8}
                  pr={8}
                  justifyContent={"space-between"}
                  mt={5}
                  rounded={10}
                >
                  <VStack width={"75%"}>
                    <Stack>
                      <Text
                        onPress={() => {
                          navigation.navigate("DetailCourse", { data });
                        }}
                        fontWeight={"800"}
                        fontSize={14}
                      >
                        {data?.name}
                      </Text>
                      <Text numberOfLines={3} fontSize={12} lineHeight={14}>
                        {data?.description}
                      </Text>
                      <HStack space={2} alignItems={"center"}>
                        <Ionicons
                          name="calendar-outline"
                          size={12}
                          color="black"
                        />
                        <Text fontSize={12}>
                          {moment(data?.date).format("DD MMM YYYY")}
                        </Text>
                      </HStack>
                    </Stack>
                  </VStack>
                  <VStack alignItems={"center"} space={2}>
                    <Box
                      p={1}
                      // width={50}
                      alignItems={"center"}
                      bg={"#81C8FF"}
                      rounded={5}
                    >
                      <Text color={"white"} fontSize={12}>
                        {data?.category.map((item) => item.name)}
                      </Text>
                    </Box>
                    <Checkbox
                      onChange={setCheck}
                      // width={100}
                      padding={2}
                      value={check}
                      rounded={"full"}
                      accessibilityLabel="This is a dummy checkbox"
                      fontSize={32}
                    />
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}
