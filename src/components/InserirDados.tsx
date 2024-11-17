import React from "react"
import { StyleSheet, TextInput, TextInputProps } from "react-native"

//montar exibição do componente de input para a index.tsx
export function InserirDados({ ...rest }: TextInputProps) {
  return (
    <TextInput style={estilo.campoTexto} {...rest} />
  )
};
const estilo = StyleSheet.create({
  campoTexto:{
    height: 54,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#999",
    paddingHorizontal: 16,
  }
})
