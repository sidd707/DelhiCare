import { tryCatch } from "../middlewares/error.js";
import {Bed}  from "../models/bedModel.js";




export const getCityStats = tryCatch(async(req,res,next)=>{
    const getTotalAvailableBedsPromise = Bed.countDocuments({isOccupied:false});
    const getTotalAvailableBedsICUPromise  = Bed.countDocuments({isOccupied:false,department:'ICU'});
    const getTotalAvailableBedsEmergencyPromise  = Bed.countDocuments({isOccupied:false,department:'Emergency'});
    const getTotalAvailableBedsGeneralPromise  = Bed.countDocuments({isOccupied:false,department:'General'});
    const [getTotalAvailableBeds,getTotalAvailableBedsICU,getTotalAvailableBedsGeneral,getTotalAvailableBedsEmergency] = await Promise.all([getTotalAvailableBedsPromise,getTotalAvailableBedsICUPromise,getTotalAvailableBedsGeneralPromise,getTotalAvailableBedsEmergencyPromise])
    
    const stats = {
        getTotalAvailableBeds,
        getTotalAvailableBedsICU,
        getTotalAvailableBedsGeneral,
        getTotalAvailableBedsEmergency,
    }
    res.status(200).json({
        success : true,
        stats,
    });
})