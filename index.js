const { MongoClient } = require("mongodb");

const username = "caiosantosdg_db_user";
const password = "Ca2408";
const cluster = "cluster0";
const dbname = "catalogodossites";
const collectionName = "sites";

const url = `mongodb+srv://${username}:${password}@${cluster}.hu4j41q.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const client = new MongoClient(url);

async function main() {
  try {
    // conectar no banco de dados
    await client.connect();
    console.log("Conectado ao MongoDB Atlas");

    const db = client.db(dbname);
    const collection = db.collection(collectionName);

    // exemplo simples de leitura
    const resultados = await collection.find().toArray();
    console.log(resultados);

    // Inserir um novo campo
    const novoSite = { nome: "Choquei", endereco: "https://www.uol.com.br" };
    const resultadosInsercao = await collection.insertOne(novoSite);
    console.log("Site inserido: ", resultadosInsercao.insertedId);

    // Listar com collection.find({}).toArray()
    const sites = await collection.find({}).toArray();
    console.log("Lista de sites: ", sites);

    // Atualizar
    const filtroAtualizacao = { _id: resultadosInsercao.insertedId };
    const atualizacao = { $set: { nome: "UOL" } };

    const resultUpdate = await collection.updateOne(
      filtroAtualizacao,
      atualizacao
    );

    if (resultUpdate.modifiedCount > 0) {
      console.log("Site atualizado com sucesso!");
    } else {
      console.log("Nenhum site foi atualizado.");
    }

    //Delete One
    const filtroDeleteOne = { _id: insercao.insertedId };
    const deleteOneResultado = await collection.deleteOne(filtroDeleteOne);
    console.log(
      `deleteOne: ${deleteOneResult.deletedCount} documento removido.`
    );

    // 5. DELETE MANY, excluir muitos documentos
    const filtroDeleteMany = { nome: "Choquei" };
    const deleteManyResult = await collection.deleteMany(filtroDeleteMany);
    console.log(
      `deleteMany: ${deleteManyResult.deletedCount} documentos removidos.`
    );
    
  } catch (err) {
    console.error("Erro ao conectar:", err);
  } finally {
    // Fechar a conexão com MongoDB Atlas
    await client.close();
    console.log("Conexão encerrada");
  }
}

main();
