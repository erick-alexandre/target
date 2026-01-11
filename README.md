# 🎯 Target - Financial Goals Tracker

![React Native](https://img.shields.io/badge/React_Native-v0.81-blue) ![Expo](https://img.shields.io/badge/Expo-v54-black) ![React](https://img.shields.io/badge/React-v19-blue) ![License](https://img.shields.io/badge/License-MIT-green)

> Um aplicativo mobile moderno para gerenciamento de metas financeiras, permitindo o acompanhamento de progresso através de transações de entrada e saída.

## 📱 Sobre o Projeto

O **Target** é uma aplicação desenvolvida para ajudar usuários a conquistarem seus objetivos financeiros. Diferente de gerenciadores financeiros genéricos, o foco aqui é na **Meta**. O usuário define um objetivo (ex: "Viagem", "Carro Novo") e registra transações específicas para aquele objetivo, visualizando o progresso em tempo real.

O projeto foi construído para ser **Offline-First**, utilizando banco de dados local para garantir que os dados estejam sempre acessíveis.

## ✨ Funcionalidades

- **Gerenciamento de Metas:** Criação de objetivos financeiros com nome e valor alvo.
- **Transações Vinculadas:** Adição de entradas (depósitos) e saídas (retiradas) diretamente em cada meta.
- **Acompanhamento Visual:**
  - Barra de progresso percentual.
  - Indicadores de valor atual vs. valor alvo.
- **Dashboard Resumido:** Visão geral do total acumulado e fluxo de caixa (entradas/saídas) na tela inicial.
- **Persistência de Dados:** Armazenamento local seguro utilizando SQLite.

## 🛠️ Tecnologias & Arquitetura

Este projeto utiliza o que há de mais recente no ecossistema React Native, servindo como um exemplo de implementação de tecnologias "bleeding edge":

- **[React Native 0.81](https://reactnative.dev/) & [Expo 54](https://expo.dev/):** Utilizando a versão mais recente do framework.
- **New Architecture (Fabric):** O projeto está configurado com a `newArchEnabled: true`, aproveitando a nova ponte de comunicação C++ para alta performance.
- **[React 19](https://react.dev/):** Uso das novas APIs e otimizações do React 19 no ambiente mobile.
- **[Expo Router v6](https://docs.expo.dev/router/introduction/):** Roteamento baseado em arquivos (file-based routing) nativo.
- **[Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/):** Banco de dados SQL local para persistência de dados robusta.
- **TypeScript:** Tipagem estática para maior segurança e manutenibilidade do código.

## 📦 Como Executar

Siga os passos abaixo para rodar o projeto no seu ambiente:

1. **Clone o repositório:**
   git clone https://github.com/erick-alexandre/target.git

2. **Instale as dependências:** npm install

3. **Inicie o projeto com Expo:** npx expo start

4. Rode no dispositivo:

- Pressione a para abrir no Emulador Android.
- Pressione i para abrir no Simulador iOS.
- Ou escaneie o QR Code com o app Expo Go (ou build de desenvolvimento) no seu celular.
