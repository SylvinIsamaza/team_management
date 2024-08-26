const axios = require("axios");

export const syncWithVMix = async (match) => {
  try {
    const response = await axios.post("http://vmix-server-url/sync", {
      matchId: match._id,
      homeTeamScore: match.homeTeamScore,
      awayTeamScore: match.awayTeamScore,
    });
    console.log("vMix sync response:", response.data);
  } catch (error) {
    console.error("Error syncing with vMix:", error.message);
  }
};
