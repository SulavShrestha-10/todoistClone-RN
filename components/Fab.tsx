import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { toast } from "sonner-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
const Fab = () => {
	const router = useRouter();
	const onPress = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		router.push("/task/new");
	};

	return (
		<TouchableOpacity style={styles.fab} onPress={onPress}>
			<FontAwesome6 name="add" size={24} color="white" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		right: 20,
		bottom: 20,
		backgroundColor: Colors.primary,
		padding: 15,
		borderRadius: 30,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
	},
});

export default Fab;
