import { Colors } from "@/constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
	const handleGoogleOAuth = async () => {
		try {
			const { createdSessionId, setActive } = await startOAuthFlow({
				redirectUrl: Linking.createURL("/", { scheme: "myapp" }),
			});
			console.log("handle google auth ~ createdSessionId:", createdSessionId);
			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			}
		} catch (error) {
			console.log("OAuth Error:", { error });
		}
	};

	const openLink = async () => {
		await WebBrowser.openBrowserAsync("https://www.google.com/");
	};

	return (
		<SafeAreaView mode="padding" edges={["top", "bottom"]} style={styles.container}>
			<Image style={styles.loginImage} source={require("@/assets/images/todoist-logo.png")} contentFit="contain" />
			<Image style={styles.bannerImage} source={require("@/assets/images/login.png")} contentFit="contain" />
			<View style={styles.btnContainer}>
				<TouchableOpacity style={styles.btn} onPress={handleGoogleOAuth}>
					<Ionicons name="logo-google" size={24} />
					<Text style={styles.btnText}>Continue with Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={() => {}}>
					<Ionicons name="mail" size={24} />
					<Text style={styles.btnText}>Continue with Email</Text>
				</TouchableOpacity>
				<Text style={styles.description}>
					By continuing you agree to Todoist's{" "}
					<Text style={styles.link} onPress={openLink}>
						Terms of Service
					</Text>{" "}
					and{" "}
					<Text style={styles.link} onPress={openLink}>
						Privacy Policy
					</Text>
					.
				</Text>
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		gap: 40,
		marginTop: 20,
	},
	loginImage: {
		height: 40,
		width: "100%",
		alignSelf: "center",
	},
	bannerImage: {
		width: "100%",
		height: 280,
		alignSelf: "center",
	},
	btnContainer: {
		gap: 10,
		marginHorizontal: 40,
	},
	btn: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		padding: 10,
		borderRadius: 10,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.lightBorder,
	},
	btnText: {
		fontSize: 20,
		fontWeight: "500",
	},
	description: {
		fontSize: 12,
		textAlign: "center",
		color: Colors.lightText,
	},
	link: { textDecorationLine: "underline" },
});
