import Squad from "../models/squad.js";
import Team from "../models/team.js";
import Tournament from "../models/tournament.js";
export async function createSquad(req, res, next) {
  const { team, players, tournament } = req.body;

  try {
    const validTeam = await Team.findById(team);
    const validTournament = await Tournament.findById(tId);

    if (!validTeam || !validTournament) {
      return res.status(400).json({ message: "Invalid team or tournament ID" });
    }

    const squad = new Squad({ team, players, tournament });
    await squad.save();

    res.status(201).json(squad);
  } catch (error) {
    next(error);
  }
}

export async function getAllSquads(req, res, next) {
  try {
    const squads = await Squad.find()
      .populate("team")
      .populate("players")
      .populate("tournament");
    res.status(200).json(squads);
  } catch (error) {
    next(error);
  }
}

export async function getSquadById(req, res, next) {
  const { id } = req.params;

  try {
    const squad = await Squad.findById(id)
      .populate("team")
      .populate("players")
      .populate("tournament");

    if (!squad) {
      return res.status(404).json({ message: "Squad not found" });
    }

    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
}

export async function updateSquad(req, res, next) {
  const { id } = req.params;
  const { team, players, tournament } = req.body;

  try {
    const validTeam = team ? await Team.findById(team) : null;
    const validTournament = tournament ? await Tournament.findById(tId) : null;

    if (team && !validTeam) {
      return res.status(400).json({ message: "Invalid team ID" });
    }

    if (tournament && !validTournament) {
      return res.status(400).json({ message: "Invalid tournament ID" });
    }

    const squad = await Squad.findByIdAndUpdate(
      id,
      { team, players, tournament },
      { new: true }
    )
      .populate("team")
      .populate("players")
      .populate("tournament");

    if (!squad) {
      return res.status(404).json({ message: "Squad not found" });
    }

    res.status(200).json(squad);
  } catch (error) {
    next(error);
  }
}

export async function deleteSquad(req, res, next) {
  const { id } = req.params;

  try {
    const squad = await Squad.findByIdAndDelete(id);

    if (!squad) {
      return res.status(404).json({ message: "Squad not found" });
    }

    res.status(200).json({ message: "Squad deleted successfully" });
  } catch (error) {
    next(error);
  }
}
