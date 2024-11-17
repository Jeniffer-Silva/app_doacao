//pegar somente a tipagem de database
import { type SQLiteDatabase } from "expo-sqlite"

//receber a base de dados do tipo SQLiteDatabase e criar tabela
export async function inicializarBaseDados(dt: SQLiteDatabase) {
  await dt.execAsync(
    `CREATE TABLE IF NOT EXISTS itemDoacao (
      idItem INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      tamanho TEXT NOT NULL,
      instituicao TEXT NOT NULL,
      status TEXT NOT NULL
    );`
  )
}
