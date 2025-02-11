import { projects, todos } from "@/db/schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import AsyncStorage from "expo-sqlite/kv-store";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
	const value = AsyncStorage.getItemSync("initialized");
	if (value) return;

	await db.insert(projects).values([
		{ name: "Inbox", color: "#000000" },
		{ name: "Work", color: "#0a009c" },
	]);

	await db.insert(todos).values([
		{
			name: "Read a new book",
			description: "Pick a book from the reading list and start reading",
			priority: 2,
			completed: 0,
			project_id: 1,
			date_added: Date.now(),
		},
		{
			name: "Plan weekend activities",
			description: "Decide on activities for Saturday and Sunday",
			priority: 3,
			completed: 0,
			project_id: 1,
			date_added: Date.now(),
		},
		{
			name: "Draft project proposal",
			description: "Outline the key points for the new project proposal",
			priority: 1,
			completed: 0,
			project_id: 2,
			date_added: Date.now(),
		},
		{
			name: "Schedule team meeting",
			description: "Set up a meeting with the team for project updates",
			priority: 2,
			completed: 0,
			project_id: 2,
			date_added: Date.now(),
		},
	]);

	AsyncStorage.setItemSync("initialized", "true");
};
