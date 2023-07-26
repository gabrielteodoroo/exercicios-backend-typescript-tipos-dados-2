const fs = require("fs");

const readFile = (): unknown => {
  return JSON.parse(fs.readFileSync("./bd.json"));
};

const writeFiles = (content: any): void => {
  return fs.writeFileSync("./bd.json", JSON.stringify(content));
};

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type User = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

const signUpUser = (dados: User): User => {
  const bd = readFile() as User[];

  bd.push(dados);

  writeFiles(bd);

  return dados;
};

const getUsers = (): User[] => {
  return readFile() as User[];
};

const updateUser = (cpf: string, dados: User) => {
  const bd = readFile() as User[];
  const usuario = bd.find((usuario) => usuario.cpf === cpf);

  if (!usuario) {
    throw new Error("Usuário não encontrado!");
  }

  Object.assign(usuario, dados);

  writeFiles(bd);

  return dados;
};

// const gabriel = signUpUser({
//   nome: "Gabriel",
//   email: "biel.teodorob@gmail.com",
//   cpf: "08282504564",
//   profissao: "Desenvolvedor",
//   endereco: {
//     cep: "12345678",
//     rua: "Rua flórida",
//     complemento: "Primeiro andar",
//     bairro: "BNH",
//     cidade: "Paulo Afonso",
//   },
// });

const detailUser = (cpf: string): User => {
  const bd = readFile() as User[];
  const usuario = bd.find((usuario) => usuario.cpf === cpf);

  if (!usuario) {
    throw new Error("Usuário não encontrado!");
  }

  return usuario;
};

updateUser("08282504564", {
  nome: "Gabriel",
  email: "biel.teodorob@gmail.com",
  cpf: "08282504564",
  profissao: "Desenvolvedor",
  endereco: {
    cep: "12345678",
    rua: "Rua flórida",
    complemento: "Casa",
    bairro: "BNH",
    cidade: "Paulo Afonso",
  },
});

// const gabriel = detailUser("08282504564");

const deleteUser = (cpf: string): User => {
  const bd = readFile() as User[];
  const usuario = bd.find((usuario) => usuario.cpf === cpf);

  if (!usuario) {
    throw new Error("Usuário não encontrado!");
  }

  const exclusao = bd.filter((usuario) => usuario.cpf !== cpf);
  writeFiles(exclusao);

  return usuario;
};

console.log(deleteUser("08282504564"));

const bd = readFile();
console.log(bd);
