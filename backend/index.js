const express = require ('express');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const rootRouter = require("./routes/index");
app.use("/api/v1", rootRouter);



const PORT = 3000;
app.listen(PORT, (err) => {
    if(err) {console.log(err)}
    console.log(`listening on port: ${PORT}`)
});