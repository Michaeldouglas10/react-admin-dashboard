import {db} from "../db.js";

//listar todos morador
export const getMorador = (_,res) =>{
    const q = "SELECT * FROM morador";

    db.query(q, (err,data)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado

        return res.status(200).json(data); // retorno 200 se deu certo
    })
}

// morador ID
export const getMoradorID = (req,res) =>{
    // A consulta SQL que busca o morador pelo ID
    const q = "SELECT * FROM morador WHERE `id_morador` = ?";

    // Obtenha o ID a partir dos parâmetros da solicitação
    const idMorador = req.params.id; 

    // Execute a consulta SQL
    db.query(q, [idMorador], (err, data) => {
        if (err) {
            // Retorna um erro se houver um problema na consulta
            return res.status(500).json({ message: "Erro ao consultar o banco de dados", error: err });
        }
        
        if (data.length === 0) {
            // Retorna um erro 404 se nenhum dado for encontrado
            return res.status(404).json({ message: "Morador não encontrado" });
        }

        // Retorna os dados encontrados
        return res.status(200).json(data[0]);
    });
}

//adicionando novo usuario

export const addMorador = (req,res) =>{
    const q = "INSERT INTO morador (`nome_morador`,`sobrenome_morador`,`tel_morador`,`veiculo_morador`,`marca_morador`,`modelo_morador`,`placa_morador`,`cor_morador`,`id_casa`,`imagem_morador`,`usuario_morador`,`password`,`id_user`) VALUES (?)";

    const values = [
        req.body.nome,
        req.body.sobrenome,
        req.body.tel,
        req.body.email,
        req.body.bloco,
        req.body.rua,
    ];
    
    db.query(q, [values], (err)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado

        return res.status(200).json("Morador criado com sucesso ..."); // retorno 200 se deu certo
 })
}


//atualizando usuario

export const updateMorador = (req,res) =>{
    const r = "UPDATE morador SET `nome`= ?,`sobrenome`= ?,`tel`= ?,`email`= ?,`bloco`= ?,`rua` = ? WHERE `idmorador`  = ?";
    
    const values = [
      
        req.body.nome,
        req.body.sobrenome,
        req.body.tel,
        req.body.email,
        req.body.bloco,
        req.body.rua,
        
    ];
  
    db.query(r, [...values, req.params.id], (err)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado
  
        return res.status(200).json("Morador Atualizado com sucesso ..."); // retorno 200 se deu certo
    })
  }

//deletar usuario

export const deleteMorador = (req,res) =>{
    const q = "DELETE FROM morador  WHERE `id_morador`  = ?";
    
    db.query(q, [req.params.id], (err)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado

        return res.status(200).json("Morador Deletado com sucesso ..."); // retorno 200 se deu certo
    })
}



// Função para obter o total de moradores

export const getTotalMoradores = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM morador";

    db.query(q, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao consultar o banco de dados", error: err });
        }

        // Assumindo que a consulta retorna um array com um objeto
        const total = results[0].total;
        return res.status(200).json({ total });
    });
}