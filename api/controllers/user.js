import {db} from "../db.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

//listar todos usuario
export const getUsers = (_,res) =>{
    const q = "SELECT * FROM usuarios";

    db.query(q, (err,data)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado

        return res.status(200).json(data); // retorno 200 se deu certo
    })
}

//adicionando novo usuario

export const addUser = (req,res) =>{
    const q = "INSERT INTO morador (`nome_morador`,`bloco`,`tel_morador`,`email`) VALUES (?)";
    //const q = "INSERT INTO morador (`nome_morador`,`bloco`,`tel_morador`,`email`) VALUES ('michael','10','1231266484','michael@unisal.com')";
    
    const values = [
        req.body.nome_morador,
        req.body.bloco,
        req.body.tel_morador,
        req.body.email,
    ];
    
    db.query(q, [values], (err)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado

        return res.status(200).json("Usuario criado com sucesso ..."); // retorno 200 se deu certo
 })
}


//atualizando usuario

export const updateUser = (req,res) =>{
    const q = "UPDATE usuarios SET `nome` = ?,`email` = ?,`fone` = ?,`data` = ? WHERE `id`  = ?";
    
    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data,
    ];

    db.query(q, [...values, req.params.id], (err)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado

        return res.status(200).json("Usuario Atualizado com sucesso ..."); // retorno 200 se deu certo
    })
}

//deletar usuario

export const deleteUser = (req,res) =>{
    const q = "DELETE FROM usuarios  WHERE `idusuarios`  = ?";
    
    db.query(q, [req.params.id], (err)=> {
        if(err) return res.json(err); // aparecer msg de erro se deu errado

        return res.status(200).json("Usuario Deletado com sucesso ..."); // retorno 200 se deu certo
    })
}



/*================  Add registro login ===================================================================== */
export const addRegister = (req,res) =>{
  const { usuario_morador, password } = req.body; // Utilize destructuring para obter usuario e password

  db.query("SELECT * FROM morador WHERE usuario_morador = ?", [usuario_morador], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO morador (usuario_morador, password) VALUE (?,?)",
          [usuario_morador, hash],
          (err, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "usuario já cadastrado" });
    }
  });
};



/*================  login ===================================================================== */
export const login = (req,res) =>{
    const usuario_morador = req.body.usuario_morador;
    const password = req.body.password;

    db.query("SELECT * FROM morador WHERE usuario_morador = ?", [usuario_morador], (err, result) => {
      if (err) {
          console.error("Erro ao consultar banco de dados:", err);
          return res.status(500).send(err); // Retorna um status de erro 500 e a mensagem de erro
      }

      if (result.length === 0) {
          return res.send({ msg: "Usuário não registrado!" });
      }

      // Comparar a senha fornecida com a senha hash armazenada no banco de dados
      bcrypt.compare(password, result[0].password, (error, response) => {
          if (error) {
              console.error("Erro ao comparar senhas:", error);
              return res.status(500).send(error); // Retorna um status de erro 500 e a mensagem de erro
          }
          
          if (response) {
              res.send({ msg: "Usuário logado" });
          } else {
              res.send({ msg: "Senha incorreta" });
          }
      });
  });
};

/*================ fim login ===================================================================== */

export const updateLogin = (req,res) =>{
  const q = "UPDATE usuarios SET `email` = ? WHERE `idusuarios`  = ?";
  
  const values = [
    
      req.body.email,
      
  ];

  db.query(q, [...values, req.params.id], (err)=> {
      if(err) return res.json(err); // aparecer msg de erro se deu errado

      return res.status(200).json("Usuario Atualizado com sucesso ..."); // retorno 200 se deu certo
  })
}


