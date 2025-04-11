const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsing de JSON
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/src/index.html");
});

app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  const timezone = req.query.timezone || 'GMT';

  let dateObj;
  if (!date) {
    dateObj = new Date();
  } else {
    dateObj = isNaN(date) ? new Date(date) : new Date(parseInt(date));
  }

  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  // Ajuste para fuso horário (usando moment-timezone)
  const moment = require('moment-timezone');
  const adjustedDate = moment(dateObj).tz(timezone);

  res.json({
    unix: adjustedDate.valueOf(),
    utc: adjustedDate.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
