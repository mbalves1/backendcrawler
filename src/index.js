const express = require('express')
const cors = require("cors")
const app = express()
const port = 3336
const mongoose = require("mongoose")

const { Schema } = mongoose
const { SearchNoticies } = require('./crawler.js');
// const resp = require('../response.json')

const schema = new Schema({
  data: Array
})

const Job = mongoose.model("Job", schema);

const corsOptions = {
  origin: ['http://localhost:3000'], // Origem permitida (seu frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  credentials: true, // Permitir cookies e cabeçalhos de autenticação
};

const conn = require("../db/conn.js")
conn()

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors(corsOptions))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "Hello"
  })
})

app.post("/jobs", async (req, res) => {
  req.headers["Content-Type"] = "application/json";

  const data = await SearchNoticies()
  const job = new Job({data})

  await job.save()
  res.json({
    message: "Job criado com sucesso",
    job
  });
})

app.get("/jobs", async (req, res) => {
  // Executar a função SearchNoticies
  // Retornar as vagas de emprego
  const data = await SearchNoticies()
  res.json(data);
})

app.listen(port, () => {
  console.log("Server on port:" + port)
})