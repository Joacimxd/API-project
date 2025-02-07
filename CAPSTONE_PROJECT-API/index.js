import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const API_key = "#######";
let names;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/recommendation", (req, res) => {
    res.render("recommendation.ejs", {content: names});
});

app.post("/get-recommendations", async (req, res) => {
    let song = req.body.song;
    song = song.replace(" ", "+");
    try {
        const result = await axios.get(`https://tastedive.com/api/similar?k=${API_key}&q=music:${song}`);
        names = result.data.similar.results;
        res.redirect("/recommendation");
    } catch(error){
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
});