import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Alert, View, StatusBar } from "react-native";
import { useCallback, useState } from "react";
import dayjs from "dayjs";

import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/Button";
import { List } from "@/components/List";



export default function InProgress() {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [details, setDetails] = useState({
        name: "",
        current: "R$ 0,00",
        target: "R$ 0,00",
        percentage: 0
    });

    const params = useLocalSearchParams<{ id: string }>()
    const targetDatabase = useTargetDatabase();
    const transactionDatabase = useTransactionsDatabase();

    async function fetchTargetDetails() {
        try {
            const response = await targetDatabase.show(Number(params.id));

            if (!response) {
                return Alert.alert("Erro", "Meta não encontrada", [{ text: "OK", onPress: () => router.back() }]);
            }

            setDetails({
                name: response.name,
                current: numberToCurrency(response.current),
                target: numberToCurrency(response.amount),
                percentage: response.percentage
            })
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar detalhes das metas");
            console.log(error);
        }
    }

    async function fetchTransactions() {
        try {
            const response = await transactionDatabase.listByTargetId(Number(params.id));
            setTransactions(response.map((item) => ({
                id: String(item.id),
                value: numberToCurrency(item.amount),
                date: dayjs(item.created_at).format("DD/MM/YYYY [as] HH:mm:ss"),
                description: item.observation,
                type: item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input
            })))
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as transações");
            console.log(error);
        }
    }

    async function fetchData() {
        const fetchDetailsPromise = fetchTargetDetails();
        const fetchTransactionsPromise = fetchTransactions();

        await Promise.all([fetchDetailsPromise, fetchTransactionsPromise]);
        setIsFetching(false);
    }

    function handleTransactionRemove(id: number) {
        Alert.alert("Excluir transação", "Tem certeza que deseja excluir essa transação?", [
            { text: "Não", style: "cancel" },
            { text: "Sim", onPress: () => transactionRemove(id) },
        ])
    }

    async function transactionRemove(id: number) {
        try {
            await transactionDatabase.remove(id);
            fetchData();
            Alert.alert("Transação", "Transação excluída com sucesso");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir a transação");
            console.log(error);
        }
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
        <View style={{ flex: 1, padding: 24, gap: 32 }}>
            <StatusBar barStyle="dark-content"/>

            <PageHeader
                title={details.name}
                rightButton={{
                    icon: "edit",
                    onPress: () => router.navigate(`/target?id=${params.id}`)
                }} />

            <Progress data={{ current: details.current, target: details.target, percentage: details.percentage }} />
            <List
                title="Transações"
                data={transactions}
                renderItem={({ item }) => (<Transaction data={item} onRemove={() => handleTransactionRemove(Number(item.id))} />)}
                emptyMessage="Nenhuma transação cadastrada"
            />
            <Button title="Nova transação" onPress={() => router.navigate(`/transaction/${params.id}`)} />
        </View>
    );
}