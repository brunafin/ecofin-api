import StartUp from "./app";

// mesma coisa que o index.js

const port = process.env.PORT || "3000";

StartUp.app.listen(port, function () {
  console.log(`Servidor executando na porta ${port}`);
});
