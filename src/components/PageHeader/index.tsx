import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type PageHeader = {
    title: string;
    subtitle?: string;
    rightButton?: {
        onPress: () => void;
        icon: keyof typeof MaterialIcons.glyphMap;
    }
}


export function PageHeader({ title, subtitle, rightButton }: PageHeader) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.black} />
                </TouchableOpacity>

                {rightButton && (
                    <TouchableOpacity activeOpacity={0.7} onPress={rightButton.onPress}>
                        <MaterialIcons name={rightButton.icon} size={24} color={colors.gray[500]} />
                    </TouchableOpacity>
                )}
            </View>

            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    )
}