// // // const fs=require('fs');
// // const express=require('express');

// // const app=express();

// // // Middleware to parse JSON
// // app.use(express.json());

// // const urlRouter=require("./routes/url");

// // const { connecttoMongodb } = require('./connect');
// // connecttoMongodb("mongodb://localhost:27017/Url-Short")
// //   .then(() => console.log("Connected to MongoDB"))
// //   .catch((err) => console.error("MongoDB connection error:", err.message));

// // app.use("/url",urlRouter);
 
// // Port=3000;

// // app.listen(Port,()=>{
// //     console.log("Server started at port: ",`${Port}`);
// // });
// const express = require('express');
// const { connecttoMongodb } = require('./connect');
// const urlRouter = require("./routes/url");

// const app = express();
// app.use(express.json());

// connecttoMongodb("mongodb://localhost:27017/Url-Short")
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// app.use("/url", urlRouter);

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server started at port: ${PORT}`);
// });
const express = require('express');
const { connecttoMongodb } = require('./connect');
const urlRouter = require('./routes/url');
const URL = require('./models/url');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connecttoMongodb("mongodb://localhost:27017/Url-Short");

app.use('/url', urlRouter);

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) return res.status(404).json({ error: "Not found" });

  res.redirect(entry.redirectUrl); // ✅ Fixed key
  
});

app.get('/', (req, res) => {
  res.send(`
    <form action="/url" method="POST">
      <input type="text" name="url" placeholder="Enter URL" required />
      <button type="submit">Shorten</button>
    </form>
  `);
});

app.listen(3000);
