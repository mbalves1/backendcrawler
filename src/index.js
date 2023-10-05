const express = require('express')
const cors = require("cors")
const app = express()
const port = 3336

// const { SearchNoticies } = require('./crawler.js');
const resp = require('../response.json')

const corsOptions = {
  origin: ['http://localhost:3000'], // Origem permitida (seu frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  credentials: true, // Permitir cookies e cabeçalhos de autenticação
};

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

app.get("/jobs", async (req, res) => {
  console.log(">>>", resp)
  
  res.json(resp);
});

app.listen(port, () => {
  console.log("Server on port:" + port)
})