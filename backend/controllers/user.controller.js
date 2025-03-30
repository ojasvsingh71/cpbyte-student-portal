import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import ResponseError from "../types/ResponseError.js";

export const userAttendance = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: { attendances: true },
    });

    if (!user) throw new ResponseError("User does not exist", 401);

    res.json({ success: true,message: "Attendance Fetched successfully", data: user.attendances });
});