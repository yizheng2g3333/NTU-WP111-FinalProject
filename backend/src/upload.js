import Spot from './models/spot'
import infoData from '../output.json'
import Distance from "./models/distance"
import During from "./models/during"
import disData from "../distance.json"
import durData from "../during.json"

const dataInit = async () => {
  const checkData = await Spot.find()

  // await Distance.deleteMany({})
  // await During.deleteMany({})
  // await Distance.insertMany(disData)
  // await During.insertMany(durData)

  if (!checkData.length) {
    console.log("Total spot are not equal to all", checkData.length)
    await Spot.deleteMany({})
    await Spot.insertMany(infoData)
  }
  else {
    await Spot.deleteMany({})
    await Spot.insertMany(infoData)
    console.log("The number of spots is correct", checkData.length)
  }
}


export { dataInit }