import { Pressable, PressableProps, StyleSheet, Text, TouchableOpacity } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import React from "react"

//criar tipagem para as propriedades customizadas
type Props = PressableProps & {
  dadoParam: {
    nome: string
    tamanho: string
    instituicao: string
    status: string
  }
  onDelete: () => void
  onOpen: () => void
}

//montar exibição dos dados para a index.tsx
export function ExibirDadosItem({ dadoParam, onDelete, onOpen, ...rest }: Props) {
  return (
    <Pressable style={estilo.botao} {...rest}>
      <Text style={estilo.txtDadosItem}>
        Item: {dadoParam.nome}
        {"\n"}
        Tamanho: {dadoParam.tamanho}
        {"\n"}
        Instituição: {dadoParam.instituicao}
        {"\n"}
        Status: {dadoParam.status}
      </Text>

      <TouchableOpacity onPress={onDelete}>
      <Ionicons name="trash" size={24} style={estilo.iconeLixeira} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpen}>
        <Ionicons name="eye" size={24} style={estilo.iconeVisu} />
      </TouchableOpacity>
    </Pressable>
  )
};

const estilo = StyleSheet.create({
  botao:{
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#BF2424",
    backgroundColor: "#FCB09F",
    padding: 5,
    borderRadius: 5,
    gap: 20,
    flexDirection: "row"
  },
  iconeLixeira:{
    margin: 10,
    color: "#BF2424"
  },
  iconeVisu:{
    margin: 10,
    color: "#2F6112"
  },
  txtDadosItem:{
    flex: 1
  }
})
