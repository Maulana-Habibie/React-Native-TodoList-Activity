import { createStackNavigator } from "@react-navigation/stack";
import AddContact from "./src/screens/AddContact";
import DetailContact from "./src/screens/DetailContact";
import EditContact from "./src/screens/EditContact";
import Home from "./src/screens/Home";

const Stack = createStackNavigator();

export default function Container() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddActivity" component={AddContact} />
      <Stack.Screen name="DetailActivity" component={DetailContact} />
      <Stack.Screen name="EditActivity" component={EditContact} />
    </Stack.Navigator>
  );
}
