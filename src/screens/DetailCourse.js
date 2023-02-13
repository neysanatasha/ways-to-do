import {
  Box,
  Checkbox,
  HStack,
  NativeBaseProvider,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default function DetailCourse(data) {
  return (
    <NativeBaseProvider>
      <Box>
        <ScrollView>
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
                  fontSize={24}
                >
                  {data?.route.params.data.name}
                </Text>
                <Text numberOfLines={35} fontSize={12} lineHeight={14}>
                  {data?.route.params.data.description}
                </Text>
                <HStack space={2} alignItems={"center"}>
                  <Ionicons name="calendar-outline" size={12} color="black" />
                  <Text fontSize={12}>
                    {moment(data?.route.params.data.date).format("DD MMM YYYY")}
                  </Text>
                </HStack>
              </Stack>
            </VStack>
            <VStack alignItems={"center"} space={2}>
              <Box
                p={1}
                alignItems={"center"}
                bg={"#81C8FF"}
                rounded={5}
              >
                <Text color={"white"} fontSize={12}>
                  {data?.route.params.data.category.map((item) => item.name)}
                </Text>
              </Box>
              <Checkbox
                padding={2}
                value="test"
                rounded={"full"}
                accessibilityLabel="This is a dummy checkbox"
                fontSize={32}
              />
            </VStack>
          </HStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}
