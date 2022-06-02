const app = require('./server');




const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
console.log("Server Listen on Port", PORT, "http://localhost:4000/");
});