import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StatusBar, View } from "react-native";


export default function Target() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState<number>(0);

    const params = useLocalSearchParams<{ id?: string }>();
    const targetDatabase = useTargetDatabase()

    function handleSave() {
        if (!name.trim() || amount <= 0) {
            return Alert.alert("Meta", "Preencha nome e o valor precisa ser maior que zero.");
        }

        setIsProcessing(true);

        if (params.id) {
            update()
        } else {
            create()
        }
    }

    async function update() {
        try {
            await targetDatabase.update({ name, amount, id: Number(params.id) });
            Alert.alert("Meta", "Meta atualizada com sucesso", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar a meta");
            console.log(error);
            setIsProcessing(false);
        }
    }

    async function create() {
        try {
            await targetDatabase.create({ name, amount });
            Alert.alert("Nova Meta", "Meta criada com sucesso", [
                { text: "OK", onPress: () => router.back() },

            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a meta");
            console.log(error);
            setIsProcessing(false);
        }
    }

    async function fetchDetails(id: number) {
        try {
            const response = await targetDatabase.show(id);

            if (!response) {
                return Alert.alert("Erro", "Meta não encontrada", [{ text: "OK", onPress: () => router.back() }]);
            }

            setName(response.name);
            setAmount(response.amount);

        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar detalhes da meta");
            console.log(error);
        }
    }

    function handleRemove() {
        if (!params.id) {
            return Alert.alert("Erro", "Meta não encontrada");
        }

        Alert.alert("Atenção", "Tem certeza que deseja excluir essa meta?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => remove() },

        ])
    }

    async function remove() {
        try {
            setIsProcessing(true);
            await targetDatabase.remove(Number(params.id));
            Alert.alert("Meta", "Meta excluída com sucesso", [
                { text: "OK", onPress: () => router.replace("/") },
            ]);

        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a meta");
            console.log(error);
        }
    }

    useEffect(() => {
        if (params.id) {
            fetchDetails(Number(params.id));
        }
    }, [params.id]);

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <StatusBar barStyle="dark-content"/>
            <PageHeader
                title="Meta"
                subtitle="Economize para alcançar sua meta financeira"
                rightButton={
                    params.id ? { icon: "delete", onPress: () => handleRemove() } : undefined
                }
            />

            <View style={{ marginTop: 32, gap: 24 }}>
                <Input label="Nome da meta" placeholder="Ex: Comprar um celular" onChangeText={setName} value={name} />
                <CurrencyInput label="Valor do alvo (R$)" value={amount} onChangeValue={(value) => setAmount(value ?? 0)} />
                <Button title="Salvar" onPress={handleSave} isProcessing={isProcessing} />
            </View>
        </View>
    );
}