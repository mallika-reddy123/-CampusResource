const Booking = require("../models/Booking");
const Resource = require("../models/Resource");

// @desc    Create new booking with conflict detection
// @route   POST /api/bookings/create
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { resourceId, date, startTime, endTime, purpose } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!resourceId || !date || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if resource exists
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    // Check for conflicts
    const conflictCheck = await Booking.checkConflict(
      resourceId,
      date,
      startTime,
      endTime,
    );

    if (conflictCheck.hasConflict) {
      // Find alternative resources
      const alternatives = await findAlternativeResources(
        resource.type,
        resourceId,
        date,
        startTime,
        endTime,
      );

      return res.status(409).json({
        success: false,
        message: "Time slot already booked for this resource",
        conflict: true,
        conflictingBooking: conflictCheck.conflictingBooking,
        alternatives,
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      resourceId,
      date,
      startTime,
      endTime,
      purpose,
      status: "confirmed",
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("userId", "name email")
      .populate("resourceId", "name type capacity");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error creating booking",
    });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;

    const bookings = await Booking.find({ userId })
      .populate("resourceId", "name type capacity image")
      .sort("-date -startTime");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching bookings",
    });
  }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings/all
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email role")
      .populate("resourceId", "name type capacity")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching bookings",
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/cancel/:id
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if user owns the booking or is admin
    if (
      booking.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to cancel this booking",
      });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error cancelling booking",
    });
  }
};

// @desc    Check availability for specific resource and time
// @route   POST /api/bookings/check-availability
// @access  Public
exports.checkAvailability = async (req, res) => {
  try {
    const { resourceId, date, startTime, endTime } = req.body;

    const conflictCheck = await Booking.checkConflict(
      resourceId,
      date,
      startTime,
      endTime,
    );

    res.status(200).json({
      success: true,
      available: !conflictCheck.hasConflict,
      conflict: conflictCheck.hasConflict
        ? conflictCheck.conflictingBooking
        : null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error checking availability",
    });
  }
};

// Helper function to find alternative resources
async function findAlternativeResources(
  type,
  excludeResourceId,
  date,
  startTime,
  endTime,
) {
  try {
    const allResourcesOfType = await Resource.find({
      type,
      _id: { $ne: excludeResourceId },
      isAvailable: true,
    });

    const availableAlternatives = [];

    for (let resource of allResourcesOfType) {
      const conflictCheck = await Booking.checkConflict(
        resource._id,
        date,
        startTime,
        endTime,
      );

      if (!conflictCheck.hasConflict) {
        availableAlternatives.push({
          id: resource._id,
          name: resource.name,
          type: resource.type,
          capacity: resource.capacity,
          image: resource.image,
        });
      }

      // Limit to 3 alternatives
      if (availableAlternatives.length >= 3) break;
    }

    return availableAlternatives;
  } catch (error) {
    console.error("Error finding alternatives:", error);
    return [];
  }
}
