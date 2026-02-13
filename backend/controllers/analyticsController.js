const Booking = require("../models/Booking");
const Resource = require("../models/Resource");

// @desc    Get usage analytics
// @route   GET /api/analytics/usage
// @access  Private
exports.getUsageAnalytics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments({
      status: { $ne: "cancelled" },
    });
    const activeBookings = await Booking.countDocuments({
      status: "confirmed",
      date: { $gte: new Date() },
    });
    const totalResources = await Resource.countDocuments();

    // Bookings by type
    const bookingsByType = await Booking.aggregate([
      {
        $match: { status: { $ne: "cancelled" } },
      },
      {
        $lookup: {
          from: "resources",
          localField: "resourceId",
          foreignField: "_id",
          as: "resource",
        },
      },
      { $unwind: "$resource" },
      {
        $group: {
          _id: "$resource.type",
          count: { $sum: 1 },
        },
      },
    ]);

    // Recent bookings trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentTrend = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        activeBookings,
        totalResources,
        bookingsByType,
        recentTrend,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching usage analytics",
    });
  }
};

// @desc    Get peak hours analytics
// @route   GET /api/analytics/peak-hours
// @access  Private
exports.getPeakHours = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: { $ne: "cancelled" } });

    const hourCounts = {};

    bookings.forEach((booking) => {
      const hour = parseInt(booking.startTime.split(":")[0]);
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const peakHoursData = Object.keys(hourCounts)
      .map((hour) => ({
        hour: `${hour}:00`,
        count: hourCounts[hour],
      }))
      .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

    // Find peak hour
    const peakHour = Object.keys(hourCounts).reduce((a, b) =>
      hourCounts[a] > hourCounts[b] ? a : b,
    );

    res.status(200).json({
      success: true,
      data: {
        peakHour: `${peakHour}:00`,
        peakHourBookings: hourCounts[peakHour],
        hourlyDistribution: peakHoursData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching peak hours",
    });
  }
};

// @desc    Get top resources
// @route   GET /api/analytics/top-resources
// @access  Private
exports.getTopResources = async (req, res) => {
  try {
    const topResources = await Booking.aggregate([
      {
        $match: { status: { $ne: "cancelled" } },
      },
      {
        $group: {
          _id: "$resourceId",
          bookingCount: { $sum: 1 },
        },
      },
      { $sort: { bookingCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "resources",
          localField: "_id",
          foreignField: "_id",
          as: "resource",
        },
      },
      { $unwind: "$resource" },
      {
        $project: {
          _id: 0,
          resourceId: "$_id",
          name: "$resource.name",
          type: "$resource.type",
          capacity: "$resource.capacity",
          image: "$resource.image",
          bookingCount: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: topResources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching top resources",
    });
  }
};

// @desc    Get underutilized resources
// @route   GET /api/analytics/underutilized
// @access  Private
exports.getUnderutilizedResources = async (req, res) => {
  try {
    const allResources = await Resource.find();
    const resourceBookings = await Booking.aggregate([
      {
        $match: { status: { $ne: "cancelled" } },
      },
      {
        $group: {
          _id: "$resourceId",
          bookingCount: { $sum: 1 },
        },
      },
    ]);

    const bookingMap = {};
    resourceBookings.forEach((item) => {
      bookingMap[item._id.toString()] = item.bookingCount;
    });

    const underutilized = allResources
      .map((resource) => ({
        resourceId: resource._id,
        name: resource.name,
        type: resource.type,
        capacity: resource.capacity,
        image: resource.image,
        bookingCount: bookingMap[resource._id.toString()] || 0,
      }))
      .sort((a, b) => a.bookingCount - b.bookingCount)
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: underutilized,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching underutilized resources",
    });
  }
};

// @desc    Get booking statistics
// @route   GET /api/analytics/stats
// @access  Private
exports.getBookingStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    const [totalBookings, monthlyBookings, weeklyBookings, cancelledBookings] =
      await Promise.all([
        Booking.countDocuments({ status: { $ne: "cancelled" } }),
        Booking.countDocuments({
          status: { $ne: "cancelled" },
          createdAt: { $gte: startOfMonth },
        }),
        Booking.countDocuments({
          status: { $ne: "cancelled" },
          createdAt: { $gte: startOfWeek },
        }),
        Booking.countDocuments({ status: "cancelled" }),
      ]);

    const utilizationRate =
      totalBookings > 0
        ? (((totalBookings - cancelledBookings) / totalBookings) * 100).toFixed(
            1,
          )
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalBookings,
        monthlyBookings,
        weeklyBookings,
        cancelledBookings,
        utilizationRate: parseFloat(utilizationRate),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching booking stats",
    });
  }
};
