import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema({
  userId: {
    types:mongoose.Schema.Types.ObjectId
  },
  matches: [{
    type:mongoose.Schema.Types.ObjectId
  }
  ],
  competitions: [{
    type:mongoose.Schema.Types.ObjectId
  }
  ],
  teams: [{
    type:mongoose.Schema.Types.ObjectId
  }
  ]
});

const Favorites = mongoose.model("Favorites", favoritesSchema);
export default Favorites;
