import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";


type Props = TouchableOpacityProps & {
    title: string;
    isProcessing?: boolean;
}


export function Button({title, isProcessing = false, ...rest}: Props){
    return(
        <TouchableOpacity disabled={isProcessing} style={styles.container} {...rest} activeOpacity={0.8}>
            <Text style={styles.title}>{isProcessing ? (<ActivityIndicator size="small" color={colors.white} />) : (title)}</Text>
        </TouchableOpacity>
    )
}