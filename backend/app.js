const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const sequelize = require('./utils/database');
const controller = require("./controller/meetingController");


const app = express();
app.use(bodyParser.json());
app.use(cors());

(async () => {
  await sequelize.sync();
  console.log("Appointment model synced with database.");
})();

app.post("/add-meeting", controller.createMeeting);
app.get("/get-meetings", controller.getMeetings);
app.delete('/delete-meeting/:id', controller.deleteMeeting);
// app.put('/expenses/:id', controller.editExpense);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
