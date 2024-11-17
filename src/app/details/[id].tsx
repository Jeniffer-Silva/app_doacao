//arquivo para informar parâmetros para uma rota dentro do app

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { useLocalSearchParams } from "expo-router"

import { manipularDados } from "@/base_dados/manipularDados"
import React from "react"

export default function detalharItem() {
  //guardar as informações do item
  const [dadoParam, setData] = useState({
    nome: "",
    tamanho: "",
    instituicao: "",
    status: "",
  })

  const dbItem = manipularDados()
  const params = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    if (params.id) {
      dbItem.pesquisarId(Number(params.id)).then((response) => {
        if (response) {
          setData({
            nome: response.nome,
            tamanho: response.tamanho,
            instituicao: response.instituicao,
            status: response.status
          })
        }
      })
    }
  }, [params.id])

  //tela inteira com os detalhes do item
  return (
    <View style={estilo.campoDealhesItem}>
        <Text style={estilo.txtDetalhesItem}>Código: {params.id} </Text>
        <Text style={estilo.txtDetalhesItem}>Nome: {dadoParam.nome}</Text>
        <Text style={estilo.txtDetalhesItem}>Tamanho: {dadoParam.tamanho}</Text>
        <Text style={estilo.txtDetalhesItem}>Instituição: {dadoParam.instituicao}</Text>
        <Text style={estilo.txtDetalhesItem}>Status: {dadoParam.status}</Text>
    </View>
  )
};
const { width, height } = Dimensions.get('window');
const estilo = StyleSheet.create({
  header: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: width / 4, //proporção 4:1
  },
  imagemHeader: {
    width: width,
    height: width / 2 //proporção 2:1
  },
  campoDealhesItem:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#BF2424"
  },
  txtDetalhesItem:{
    fontSize: 32,
    alignSelf: "baseline",
    margin: 20,
    color: "white"
  }
})
