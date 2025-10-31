import { ColorValue, View } from "react-native";
import { style } from "./styles";

export function Separator({color}: { color: ColorValue }) {
    return <View style={[style.container, { backgroundColor: color}]} />;
}