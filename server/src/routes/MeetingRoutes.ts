import express, { NextFunction, Request, Response } from "express";
import MeetingLogic from "../logic/MeetingLogicMYSQL";

const router = express.Router();

router.post("/meeting", async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    try {
        const newMeeting = req.body;
        const result = await MeetingLogic.addMeeting(newMeeting);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/meetings", async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    try {
        const result = await MeetingLogic.getAllMeetings();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/meetings/:groupId", async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    try {
        const result = await MeetingLogic.getMeetingsByGroupId(+req.params.groupId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/groups", async (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    try {
        const result = await MeetingLogic.getAllGroups();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});
  
export default router;
