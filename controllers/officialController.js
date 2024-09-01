import Officials from '../models/officials.js';
import Team from '../models/team.js';
import User from '../models/user.js';

// Create a new official
export const createOfficial = async (req, res) => {
    try {
        const file = req.file;
        console.log(file)
        const fileName = file.filename
        console.log(fileName)
        const official = new Officials(req.body);
        official.avatar = fileName;
        await official.save();
        res.status(201).json({ success: true, official: official });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAllOfficials = async (req, res) => {
    try {
        const officials = await Officials.find().populate('teamID');
        res.status(200).json({ success: true, officials: officials });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get an official by ID
export const getOfficialById = async (req, res) => {
    try {
        const official = await Officials.findById(req.params.id).populate('teamID');
        if (!official) {
            return res.status(404).json({ success: false, message: 'Official not found' });
        }
        res.status(200).json({ success: true, data: official });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const updateOfficial = async (req, res) => {
    try {
        const official = await Officials.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!official) {
            return res.status(404).json({ success: false, message: 'Official not found' });
        }
        res.status(200).json({ success: true, data: official });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete an official by ID
export const deleteOfficial = async (req, res) => {
    try {
        const official = await Officials.findByIdAndDelete(req.params.id);
        if (!official) {
            return res.status(404).json({ success: false, message: 'Official not found' });
        }
        res.status(200).json({ success: true, message: 'Official deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPlayers = async (req, res) => {
  
    try {
        const playerPositions = [
            "Goalkeeper",
            "Right Back",
            "Left Back",
            "Center Back",
            "Defensive Midfielder",
            "Central Midfielder",
            "Right Midfielder",
            "Left Midfielder",
            "Attacking Midfielder",
            "Forward/Striker"
        ];
        
      const players = await Officials.find({ position: { $in: playerPositions } });
      
        res.status(200).json({ success: true,  players });
    } catch (error) {
      console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
};


