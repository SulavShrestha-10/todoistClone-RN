import { Colors } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { toast } from "sonner-native";
import * as DropdownMenu from "zeego/dropdown-menu";
interface MoreButtonProps {
	pageName: string;
}

const MoreButton = ({ pageName }: MoreButtonProps) => {
	const copyToClipboard = async () => {
		const path = `myapp://(authenticated)/(tabs)/${pageName.toLowerCase()}`;
		Clipboard.setStringAsync(path);
		toast.success("Copied to clipboard!");
	};
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<TouchableOpacity activeOpacity={0.6}>
					<FontAwesome6 name="ellipsis" size={30} color={Colors.primary} />
				</TouchableOpacity>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				<DropdownMenu.Item key="link" onSelect={copyToClipboard}>
					<DropdownMenu.ItemTitle>Copy</DropdownMenu.ItemTitle>
				</DropdownMenu.Item>
				<DropdownMenu.Group>
					<DropdownMenu.Item key="select">
						<DropdownMenu.ItemTitle>Select Tasks</DropdownMenu.ItemTitle>
					</DropdownMenu.Item>
					<DropdownMenu.Item key="view">
						<DropdownMenu.ItemTitle>View</DropdownMenu.ItemTitle>
					</DropdownMenu.Item>
					<DropdownMenu.Item key="activity">
						<DropdownMenu.ItemTitle>Activity Log</DropdownMenu.ItemTitle>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};

export default MoreButton;
