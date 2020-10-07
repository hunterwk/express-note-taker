const express = require("express");
const app = express();
const htmlRoutes= require("./routes/htmlRoutes")
const apiRoutes= require("./routes/apiRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"))

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);



app.listen(3000, () => {
    console.log('Listening on Port 3000')
});


