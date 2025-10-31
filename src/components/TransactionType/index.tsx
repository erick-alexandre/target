import { View } from "react-native"
import { styles } from "./styles"
import { Option } from "./option"
import { colors } from "@/theme"
import { TransactionTypes } from "@/utils/TransactionTypes"

type Props = {
    selected: TransactionTypes
    onChange: (type: TransactionTypes) => void
}

export function TransactionType({ selected, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Option
                title="Guardar"
                icon="arrow-upward"
                isSelected={selected === TransactionTypes.Input}
                selectedColor={colors.blue[500]}
                onPress={() => onChange(TransactionTypes.Input)}
            />
            <Option
                title="Resgatar"
                icon="arrow-downward"
                isSelected={selected === TransactionTypes.Output}
                selectedColor={colors.red[400]}
                onPress={() => onChange(TransactionTypes.Output)}
            />
        </View>
    )
}