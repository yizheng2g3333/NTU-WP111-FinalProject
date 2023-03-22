import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({

  Email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: false,
  },

  Report: {
    type: String,
    required: [true, "Please type in your feedback"],
    unique: false,
  },

  Time: {
    type: String,
    required: [true, "Time missing!"],
    unique: false,
  }

});

const ReportModel = mongoose.model('Report', ReportSchema)

export { ReportModel };