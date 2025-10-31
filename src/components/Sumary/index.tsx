import { View, Text, ColorValue } from "react-native";
import { style } from "./styles";
import { MaterialIcons } from "@expo/vector-icons"


export type SummaryProps = {
    label: string
    value: string
}

type Props = {
    data: SummaryProps
    icon: {
        name: keyof typeof MaterialIcons.glyphMap
        color: ColorValue
    }
    isRight?: boolean
}


export function Summary({ data, icon, isRight = false }: Props) {
    return (
        <View style={style.container}>
            <View style={[style.header, isRight && { justifyContent: "flex-end" }]}>
                <MaterialIcons size={16} name={icon.name} color={icon.color} />
                <Text style={style.label}>{data.label}</Text>
            </View>

            <Text style={style.value}>{data.value}</Text>
        </View>
    );
}