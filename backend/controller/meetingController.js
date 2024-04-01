const Meeting = require('../models/meetings');
exports.createMeeting = async (req, res) => {
    try {
      const { name, email, slotId,time } = req.body;
      const link = "https://meet.google.com/jum-affj-jda";
      const meeting = await Meeting.create({ name,email,link,slotId,time });
      res.status(201).json(meeting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  exports.getMeetings = async (req, res) => {
    try {
      const meetings = await Meeting.findAll();
      res.json(meetings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

exports.deleteMeeting = async (req, res) => {
    try {
        const meetingId = req.params.id;
        
        // Find the meeting by ID
        const meeting = await Meeting.findByPk(meetingId);
        
        // Check if meeting exists
        if (!meeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }
        
        // Delete the meeting
        await meeting.destroy();
        
        res.status(200).json({ message: "Meeting deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
