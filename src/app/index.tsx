import { Button } from "@/components/Button";
import { HomeHeader, HomeHeaderProps } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target, TargetProps } from "@/components/Target";
import { View, StatusBar, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { Loading } from "@/components/Loading";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function Index() {
    const [summary, setSummary] = useState<HomeHeaderProps>({
        total: numberToCurrency(0),
        input: { label: "Entradas", value: numberToCurrency(0) },
        output: { label: "Saídas", value: numberToCurrency(0) },
    });
    const [isFetching, setIsFetching] = useState(true);
    const [targets, setTargets] = useState<TargetProps[]>([]);
    const targetDatabase = useTargetDatabase();
    const transactionsDatabase = useTransactionsDatabase();

    async function fetchTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDatabase.listByClosestTarget();
            return response.map((item) => ({
                id: String(item.id),
                name: item.name,
                current: numberToCurrency(item.current),
                percentage: item.percentage.toFixed(0) + "%",
                target: numberToCurrency(item.amount)
            }))

        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as metas");
            console.log(error);
            return []
        }
    }

    async function fetchSummary(): Promise<HomeHeaderProps> {
        try {
            const response = await transactionsDatabase.summary();

            if (!response) {
                throw new Error("response is null");
            }

            return {
                total: numberToCurrency(response.input + response.output),
                input: {
                    label: "Entradas",
                    value: numberToCurrency(response.input)
                },
                output: {
                    label: "Saídas",
                    value: numberToCurrency(response.output)
                }
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar o resumo");
            console.log(error);
            return {
                total: numberToCurrency(0),
                input: { label: "Entradas", value: numberToCurrency(0) },
                output: { label: "Saídas", value: numberToCurrency(0) },
            };
        }
    }

    async function fetchData() {
        const targetDataPromise = fetchTargets();
        const dataSummaryPromise = fetchSummary();

        const [targetData, dataSumary] = await Promise.all([targetDataPromise, dataSummaryPromise]);
        setTargets(targetData);
        setSummary(dataSumary)
        setIsFetching(false);
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <HomeHeader data={summary} />
            <List
                data={targets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<Target data={item} onPress={() => router.push(`/in-progress/${item.id}`)} />)}
                emptyMessage="Nenhuma meta cadastrada"
                title="Metas"
                containerStyle={{ paddingHorizontal: 24 }}
            />

            <View style={{ padding: 24, paddingBottom: 32 }}>
                <Button title="Nova meta" onPress={() => router.push("/target")} />
            </View>

        </View>
    )
}