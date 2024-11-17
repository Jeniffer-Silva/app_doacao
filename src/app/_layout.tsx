import { Slot, Tabs } from "expo-router" //gerenciar rotas
import { SQLiteProvider } from "expo-sqlite"
import { inicializarBaseDados } from "@/base_dados/inicializarBaseDados"
import React from "react"

//prover acesso ao banco de dados no app
export default function Layout() {
  return (
    <SQLiteProvider databaseName="baseDadosDoacao.db" onInit={inicializarBaseDados}>
      <Slot />
    </SQLiteProvider>
  )
}
