import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
    container:{
        width: "100%",
        gap: 10
    },
    label:{
        color: colors.gray[600],
        fontSize: 12,
        fontFamily: fontFamily.medium
    },
    input:{
        color: colors.black,
        fontSize: 16,
        fontFamily: fontFamily.regular,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray[400]
    }
})