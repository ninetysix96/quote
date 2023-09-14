const express = require("express");
const bodyParser = require("body-parser");
const QUOTES = require("./nakyl")

const app = express();
const port = 3000;
let id = "s"


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", async(req,res) => {
    const findQuote = await QUOTES.find()

    res.render("index.ejs",{findQuote})
})

app.get("/new", async(req,res) => {
    res.render("newQuote.ejs")
})
app.post("/new", async(req,res) => {
    const newQuote = new QUOTES()
    newQuote.quote = req.body["quote"]
    newQuote.autor = req.body['autor']
    newQuote.save()
    res.redirect("/")
})

app.get("/update", async(req,res) => {
    res.render("update.ejs")
})

app.post("/update", async(req,res) => {
    id = req.body['quoteID']
    try{
        const quote = await QUOTES.findById(id)
        res.render("update.ejs", { quote });
    }catch(e){
        res.send('<script>alert("Error: Quote not found or fill the space"); window.location.href="/update";</script>');

    }

});

app.post("/update/quote", async(req,res) => {
    const newQuote = req.body["newQuote"];
    const newAuthor = req.body["newAuthor"];
    try{
        const updatedQuote = await QUOTES.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    quote: newQuote,
                    autor: newAuthor, // Change 'autor' to 'author' if it's the correct field name
                },
            },
            { new: true }
        );

        if (!updatedQuote) {
            // Handle if the quote with the specified id is not found
            res.status(404).send("<script>alert('Quote not found');</script>");
            return;
        }

        res.send("<script>alert('Updated Successfully. You will be redirected to the home page.');window.location.href='/';</script>");
    } catch(e){
        res.send('<script>alert("Error occured or fill the space"); window.location.href="/update";</script>')
    }


})

app.get("/delete", async(req,res) => {
    res.render("delete.ejs")
})

app.post("/delete", async(req,res) => {
    const deleteID = req.body["quoteID"]

    try {
        const deleteQuote = await QUOTES.deleteOne({ _id: deleteID });

        if (deleteQuote.deletedCount === 0) {
            res.status(404).send("<script>alert('Quote not found');</script>");
            return;
        }

        res.send("<script>alert('Deleted Successfully. You will be redirected to the home page.');window.location.href='/';</script>");
    } catch (e) {
        res.status(500).send('<script>alert("Error occurred while deleting"); window.location.href="/";</script>');
    }
})

app.listen(port, () => {
    console.log(`server listening on port : ${port}`);
})