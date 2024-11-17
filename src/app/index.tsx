import { useEffect, useState } from "react"
import { View, Button, Alert, FlatList, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, TextInput } from "react-native"
import { router } from "expo-router"

import { InserirDados } from "@/components/InserirDados"
import { ExibirDadosItem } from "@/components/dadosItem"

import { manipularDados, crudItem } from "@/base_dados/manipularDados"
import * as React from "react"


//armazenar dados digitados
export default function armazenarDados() {
  const [idItem, setId] = useState("")
  const [nome, setNome] = useState("")
  const [tamanho, setTamanho] = useState("")
  const [instituicao, setInstituicao] = useState("")
  const [status, setStatus] = useState("")
  const [pesquisar, setPesquisar] = useState("")
  const [itens, setItens] = useState<crudItem[]>([])

  const crudItem = manipularDados()

  async function inserirItem() {
    try {
      if (!nome || !tamanho || !instituicao || !status) {
        Alert.alert("Preencha todos os campos!");
      } else {
          const response = await crudItem.inserirItem({
          nome, tamanho, instituicao, status 
        });
        //response.insertedRowId - mostrar o ID do item cadastrado
        Alert.alert("Item cadastrado com sucesso!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function atualizarItem() {
    try {
      if (!nome || !tamanho || !instituicao || !status) {
        Alert.alert("Preencha todos os campos!");
      } else {
          const response = await crudItem.atualizarItem({
          idItem: Number(idItem), nome, tamanho, instituicao, status 
      })
      Alert.alert("Item atualizado com sucesso!")
    }
    } catch (error) {
      console.log(error)
    }
  }

  async function listarPesquisaNome() {
    try {
      const response = await crudItem.pesquisarNome(pesquisar, pesquisar)
      setItens(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function excluirItem(idItem: number) {
    try {
      await crudItem.excluirItem(idItem)
      Alert.alert("Item excluído com sucesso!")
      //atualizar a lista automaticamente após deletar o item
      await listarPesquisaNome()
    } catch (error) {
      console.log(error)
    }
  }

  function detalharItem(item: crudItem) {
    setId(String(item.idItem))
    setNome(item.nome)
    setTamanho(String(item.tamanho))
    setInstituicao(String(item.instituicao))
    setStatus(String(item.status))
  }

  async function salvarItem() {
    if (idItem) {
      atualizarItem()
    } else {
      inserirItem()
    }

    setId("")
    setNome("")
    setTamanho("")
    setStatus("")
    setInstituicao("")
    await listarPesquisaNome()
  }

  useEffect(() => {
    listarPesquisaNome()
  }, [pesquisar])

  return (
    <View style={estilo.viewPrincipal}>
      {/* início cabeçalho */}
      <View style={estilo.header}>
        <Image source={require("../../assets/images/doacao_img_01_com_logo_topo.png")} style={estilo.imagemHeader} />
      </View>
      {/* fim cabeçalho */}

      <KeyboardAvoidingView behavior="height">
        <ScrollView>
          <View style={estilo.caixaTxtInicial}>
            <Text style={estilo.txtParagrafo}>Cadastrar item a ser doado</Text>
          </View>
          <View style={estilo.campoDados}>
            <InserirDados placeholder="Nome (obrigatório)" onChangeText={setNome} value={nome} />
            <InserirDados placeholder="Tamanho (obrigatório)" onChangeText={setTamanho} value={tamanho} />
            <InserirDados placeholder="Instituição (obrigatório)" onChangeText={setInstituicao} value={instituicao} />
            <InserirDados placeholder="Status (obrigatório)" onChangeText={setStatus} value={status} />
            <Text style={estilo.txtAjuda}>
              Opções de status: “HIGIENIZAR”, “CONSERTAR”, “ENVIADO” ou “DOADO”
            </Text>

            <Button title="Cadastrar" onPress={salvarItem} color="#BF2424" />
          </View>
          <View style={estilo.caixaImagemLogo}>
            <Image source={require("../../assets/images/logo-sem-slogan - sem-fundo.png")} style={estilo.imagemLogo} />
          </View>
          <Text style={estilo.campoTxtLista}>Lista de itens cadastrados</Text>
          <InserirDados placeholder="Digite para pesquisar o nome do item" onChangeText={setPesquisar} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={estilo.campoDadosLista}>
        <FlatList style={estilo.flatList}
          data={itens}
          keyExtractor={(item) => String(item.idItem)}
          initialNumToRender={5}
          windowSize={3}
          renderItem={({ item }) => (
            <ExibirDadosItem
              dadoParam={item}
              onPress={() => detalharItem(item)}
              onDelete={() => excluirItem(item.idItem)}
              onOpen={() => router.navigate("/details/" + item.idItem)}
            />
          )} contentContainerStyle={{ gap: 16 }}
        />
      </View>
    </View>

  )
};

const { width, height } = Dimensions.get('window');
const estilo = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    padding: 32,
    gap: 16
  },
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
  campoDados: {
    gap: 5,
    marginTop: 16
  },
  txtAjuda:{
    fontSize: 12,
    color: "#BF2424"
  },
  campoTxtLista: {
    textAlign: 'center',
    fontSize: 18,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: "#BF2424",
  },
  campoDadosLista: {
    flex: 1,
  },
  txtParagrafo: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 5,
    color: "white",
  },
  caixaTxtInicial: {
    height: 30,
    marginTop: 140,
    backgroundColor: "#BF2424",
  },
  imagemLogo: {
    width: 80,
    height: 80,
    alignSelf: "center"
  },
  caixaImagemLogo: {

  },
  flatList: {
    height: 20,
    marginTop: 5,
  }
})
