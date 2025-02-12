import { PROJECT_COLORS, DEFAULT_PROJECT_COLOR } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { useColor } from "@/context/ColorContext";

const ColorSelect = () => {
	const { selectedColor, setSelectedColor } = useColor();
	const router = useRouter();
	const headerHeight = useHeaderHeight();

	const onColorSelect = (color: string) => {
		setSelectedColor(color);
		router.setParams({ bg: color });
	};

	return (
		<View style={{ marginTop: headerHeight }}>
			<View style={{ flexDirection: "row", flexGrow: 1, flexWrap: "wrap", justifyContent: "center" }}>
				{PROJECT_COLORS.map((color) => (
					<TouchableOpacity
						key={color}
						style={{
							backgroundColor: color,
							height: 60,
							width: 60,
							margin: 5,
							borderRadius: 30,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => onColorSelect(color)}>
						{selectedColor === color && <Ionicons name="checkmark" size={24} color={"#fff"} style={{}} />}
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};
export default ColorSelect;
