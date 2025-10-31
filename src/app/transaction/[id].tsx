import { Alert, StatusBar, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { TransactionType } from "@/components/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useState } from "react";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";


export default function Transaction() {
    const [amount, setAmount] = useState<number | null>(0);
    const [observation, setObservation] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [type, setType] = useState<TransactionTypes>(TransactionTypes.Input);
    const params = useLocalSearchParams<{ id: string }>();
    const transactionsDatabase = useTransactionsDatabase();

    async function handleCreate() {
        try {
            if (!amount || amount <= 0) {
                return Alert.alert("Erro", "O valor precisa ser maior que zero.");
            }
            setIsCreating(true);
            await transactionsDatabase.create({
                target_id: Number(params.id),
                amount: type === TransactionTypes.Output ? amount * -1 : amount,
                observation
            })

            Alert.alert("Sucesso", "Transação salva com sucesso", [
                { text: "OK", onPress: () => router.back() },
            ]);
            setIsCreating(false);

        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar a transação");
            console.log(error);
            setIsCreating(false);
        }
    }


    return (
        <View style={{ flex: 1, padding: 24 }}>
            <StatusBar barStyle="dark-content"/>
            <PageHeader title="Nova transação" subtitle="A cada valor guardado você fica mais perto da sua meta. Se esforce para guardar e evitar retirar" />

            <View style={{ marginTop: 32, gap: 24 }}>
                <TransactionType selected={type} onChange={setType} />
                <CurrencyInput label="Valor R$" value={amount} onChangeValue={setAmount} />
                <Input label="Motivo (opcional)" placeholder="Ex: Investir em CDB de 110% no banco XYZ" onChangeText={setObservation} />
                <Button title="Salvar" onPress={() => handleCreate()} isProcessing={isCreating} />
            </View>

        </View>
    )
}