import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.primary,
				tabBarInactiveTintColor: Colors.dark,
				headerShown: false,
			}}>
			<Tabs.Screen
				name="today"
				options={{
					title: "Today",
					tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="calendar-day" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="upcoming"
				options={{
					title: "Upcoming",
					tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="calendar-week" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="magnifying-glass" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="browse"
				options={{
					title: "Browse",
					tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="newspaper" color={color} />,
				}}
			/>
		</Tabs>
	);
}
