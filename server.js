const express = require('express')
const apiroutes = require('./routes/apiroutes')
const htmlroutes = require('./routes/htmlroutes')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/api', apiroutes);
app.use('/', htmlroutes);



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

