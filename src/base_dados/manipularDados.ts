import { useSQLiteContext } from "expo-sqlite"

export type crudItem = {
  idItem: number
  nome: string
  tamanho: string
  instituicao: string
  status: string
}

export function manipularDados() {
  const dt = useSQLiteContext()

  //adicionar item destinado à doação
  async function inserirItem(dadoParam: Omit<crudItem, "idItem">) {
    //preparar a query
    const instrucaoSql = await dt.prepareAsync(
      "INSERT INTO itemDoacao (nome, tamanho, instituicao, status) VALUES ($nome, $tamanho, $instituicao, $status)"
    )

    try {
      const result = await instrucaoSql.executeAsync({
        $nome: dadoParam.nome,
        $tamanho: dadoParam.tamanho,
        $instituicao: dadoParam.instituicao,
        $status: dadoParam.status
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }
    } catch (error) {
        throw error
    } finally {
        await instrucaoSql.finalizeAsync()
    }
  }

  //listar os itens
  async function pesquisarNome(nome: string, status: string) {
    try {
      const sql = "SELECT * FROM itemDoacao WHERE nome LIKE ? OR status LIKE ?"

      const response = await dt.getAllAsync<crudItem>(
        sql,
        `%${nome}%`, `%${status}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  //atualizar item
  async function atualizarItem(dadoParam: crudItem) {
    const instrucaoSql = await dt.prepareAsync(
      "UPDATE itemDoacao SET nome = $nome, tamanho = $tamanho, instituicao = $instituicao, status = $status WHERE idItem = $idItem"
    )

    try {
      await instrucaoSql.executeAsync({
        $idItem: dadoParam.idItem,
        $nome: dadoParam.nome,
        $tamanho: dadoParam.tamanho,
        $instituicao: dadoParam.instituicao,
        $status: dadoParam.status
      })
    } catch (error) {
      throw error
    } finally {
      await instrucaoSql.finalizeAsync()
    }
  }

  //excluir item
  async function excluirItem(idItem: number) {
    try {
      await dt.execAsync("DELETE FROM itemDoacao WHERE idItem = " + idItem)
    } catch (error) {
      throw error
    }
  }

  //buscar item pelo ID
  async function pesquisarId(idItem: number) {
    try {
      const sql = "SELECT * FROM itemDoacao WHERE idItem = ?"

      const response = await dt.getFirstAsync<crudItem>(sql, [idItem,])

      return response
    } catch (error) {
      throw error
    }
  }

  return { inserirItem, pesquisarNome, atualizarItem, excluirItem, pesquisarId }
}
