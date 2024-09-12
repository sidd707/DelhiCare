import { tryCatch } from "../middlewares/error.js";

import bcrypt from "bcryptjs";
import createToken from "./../utils/createToken.js";
import ErrorHandler from "../utils/utilityClass.js";
import { Hospital } from "../models/hospitalModel.js";





export const registerHospital = tryCatch(async (req, res, next) => {
  const {
      name,
      registrationNumber,
      email,
      password,
      contactNumber,
      address,
      location
  } = req.body;

  // Validate the input
  if (!name || !registrationNumber || !email || !password || !contactNumber || !address || !location || !location.coordinates || location.coordinates.length !== 2) {
      return next(new ErrorHandler("Please fill in all required fields", 400));
  }

  // Validate address fields
  const { street, locality, city, pinCode } = address;

  if (!street || !locality || !city || !pinCode) {
      return next(new ErrorHandler("Please provide a complete address", 400));
  }

  // Check if the hospital already exists by email or registration number
  const hospitalExists = await Hospital.findOne({
      $or: [{ email }, { registrationNumber }]
  });
  if (hospitalExists) {
      return next(new ErrorHandler("Hospital already registered", 401));
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new hospital with location
  const hospital = await Hospital.create({
      name,
      registrationNumber,
      email,
      password: hashedPassword,
      address: {
          street,
          locality,
          city,
          pinCode
      },
      contactNumber,
      location: {
          type: "Point",
          coordinates: location.coordinates // Use coordinates directly
      }
  });

  // Generate and set a token
  createToken(res, hospital._id);

  // Respond with success
  return res.status(200).json({
      success: true,
      message: `Hospital ${hospital.name} registered successfully`,
  });
});

export const loginHospital = tryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    // Find the hospital by email
    const hospital = await Hospital.findOne({ email });
    if (!hospital) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }
    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, hospital.password);
    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }
    // Generate and set a token
    createToken(res, hospital._id);
    // Respond with success
    return res.status(201).json({
        success: true,
        message: `Welcome, ${hospital.name}`,
    });
});

export const logoutHospital = tryCatch(async(req,res,next)=>{
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(201).json({
        success : true,
        message: "Logged out successfully"
    });
});

export const getHospitalPatients = tryCatch(async(req,res,next)=>{
  const {hospitalId} = req.user._id;
  const patients = PatientAdmission.find({hospitalId});
  res.status(200).json({
      success: true,
      data: patients,
  });
});
export const getBedRequests = tryCatch(async(req,res,next)=>{
  const bedRequest = await Notification.find({}).sort({createdAt:1}).populate('patientId hospitalId');
  res.status(200).json({
      success: true,
      data: bedRequest
  });
});
export const handleBedAllotmentRequest = tryCatch(async (req, res, next) => {
  const { notificationId, action, score } = req.body;

  if (!notificationId || !action || score === undefined) {
      return next(new ErrorHandler("Please provide notification ID, action, and score", 400));
  }

  const validActions = ['Approve', 'Reject'];
  if (!validActions.includes(action)) {
      return next(new ErrorHandler("Invalid action", 400));
  }

  const notification = await Notification.findById(notificationId).populate('patientId');

  if (!notification) {
      return next(new ErrorHandler("Notification not found", 404));
  }

  notification.status = action === 'Approve' ? 'Approved' : 'Rejected';
  notification.score = score;
  await notification.save();

  if (action === 'Approve') {
      const patient = notification.patientId;
      const priorityScore = calculatePriority(patient, score);

      // Find available beds in the specified department
      const availableBeds = await Bed.find({ 
          hospitalId: notification.hospitalId, 
          department: patient.department, 
          isOccupied: false 
      });

      if (availableBeds.length === 0) {
          // No beds available, add patient to the waiting queue
          await WaitingQueue.create({
              patientId: new mongoose.Types.ObjectId(patient._id),
              hospitalId: new mongoose.Types.ObjectId(notification.hospitalId),
              department: patient.department,
              score: priorityScore,
              status: 'Waiting'
          });

          // Notify patient that they are in the waiting queue
          const patientContactNumber = patient.contactNumber;
          await sendSms(`+91${patientContactNumber}`, `Your bed allotment request has been approved with a priority score of ${notification.score}, but currently, there are no available beds. You have been placed in a waiting queue.`);

          res.status(200).json({
              success: true,
              message: "No available beds. Patient added to the waiting queue.",
              data: notification
          });

          return;
      }

      // Mark the allocated bed as occupied
      const bestBed = availableBeds[0];
      bestBed.isOccupied = true;
      await bestBed.save();

      // Create a patient admission record
      const patientAdmission = await PatientAdmission.create({
          hospitalId: new mongoose.Types.ObjectId(notification.hospitalId),
          patientId: new mongoose.Types.ObjectId(patient._id),
          bedId: new mongoose.Types.ObjectId(bestBed._id),
          department: patient.department,
          status: 'Admitted',
          score: notification.score
      });

      // Notify patient and hospital admin
      const patientContactNumber = patient.contactNumber;
      await sendSms(`+91${patientContactNumber}`, `Your bed allotment request has been approved and a bed has been allocated to you with a priority score of ${notification.score}.`);

      io.to(`hospital_${notification.hospitalId}`).emit('bedAllotmentResponse', {
          notificationId,
          status: notification.status,
          bedId: bestBed._id,
          score: notification.score
      });

      res.status(200).json({
          success: true,
          message: "Bed allotment request approved and bed allocated successfully",
          data: patientAdmission
      });
  } else {
      await notification.deleteOne();
      const patientContactNumber = notification.patientId.contactNumber;
      await sendSms(patientContactNumber, `Your bed allotment request has been rejected. Please contact the hospital for further details.`);
      res.status(200).json({
          success: true,
          message: "Request rejected successfully",
          data: notification
      });
  }
});

