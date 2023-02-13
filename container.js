import Home from "./src/screens/Home";
import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import ListTodo from "./src/screens/ListTodo";
import AddList from "./src/screens/AddList";
import AddCategory from "./src/screens/AddCategory";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { setAuthToken } from "./src/config/api";
import { useQuery } from "react-query";
import DetailCourse from "./src/screens/DetailCourse";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  const logCheck = async () => {
    try {
      const response = await AsyncStorage.getItem("token");
      console.log(response);
      if (response) {
        setAuthToken(response);
        setLogin(true);
      } else {
        setLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tab.Navigator
      // initialRouteName="test"
      screenOptions={({ route }) => ({
        // headerMode: "screen",
        headerShown: false,
        // headerTintColor: "white",
        // headerStyle: { },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "ListTodo") {
            iconName = focused ? "ios-list-circle" : "ios-list-circle-outline";
          } else if (route.name == "AddList") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name == "AddCategory") {
            iconName = focused ? "md-duplicate" : "md-duplicate-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF5555",
        tabBarInactiveTintColor: "#D9D9D9",
      })}
    >
      <Tab.Screen name="ListTodo">
        {(props) => <ListTodo {...props} logCheck={logCheck} />}
      </Tab.Screen>
      <Tab.Screen name="AddList" component={AddList} />
      <Tab.Screen name="AddCategory" component={AddCategory} />
    </Tab.Navigator>
  );
}

export default function Container() {
  const [login, setLogin] = useState(false);

  const logCheck = async () => {
    try {
      const response = await AsyncStorage.getItem("token");
      console.log(response);
      if (response) {
        setAuthToken(response);
        setLogin(true);
      } else {
        setLogin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // let { data: logCheck, refetch: refetchLog } = useQuery(
  //   "logCache",
  //   async () => {
  //     const response = await AsyncStorage.getItem("token");
  //     console.log(response);
  //     return response;
  //   }
  // );

  // console.log(logCheck);
  // if (logCheck) {
  //   setAuthToken(logCheck);
  //   setLogin(true);
  // } else {
  //   setLogin(false);
  // }

  // this.setState({ logCheck });

  // {
  //   (props) => {
  //     <login {...props} />;
  //   };
  // }

  useEffect(() => {
    logCheck();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {login == false ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Login"
              component={() => <Login logCheck={logCheck} />}
              // logCheck={logCheck()}
              // options={{ title: "Testing" }}
            />
            {/* {(props) => {}} */}
            {/* </Stack.Screen> */}
          </>
        ) : (
          <>
            <Stack.Screen
              name="MyTab"
              component={() => <MyTab />}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
              name="ListTodo"
              component={() => <ListTodo logCheck={logCheck} />}
            /> */}
            <Stack.Screen name="DetailCourse" component={DetailCourse} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
