import { DEFAULT_PROJECT_COLOR } from "@/constants/Colors";
import { createContext, useContext, useState } from "react";

type ColorContextType = {
	selectedColor: string;
	setSelectedColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_PROJECT_COLOR);

	return <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>{children}</ColorContext.Provider>;
};

export const useColor = () => {
	const context = useContext(ColorContext);
	if (!context) throw new Error("useColor must be used within a ColorProvider");
	return context;
};
