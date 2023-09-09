import { developmentGroup } from '../model/Group';
import { Meeting } from '../model/Meeting';

import dal_mysql from "../utils/dal_mySql";
import { OkPacket } from "mysql";
import { response } from "express";


const addMeeting = async (meeting:Meeting) => {
    const sql = `
    INSERT INTO meeting.meetings
    (groupCode, meetingStartDate, meetingEndDate, meetingDescription, meetingRoom)
    VALUES (${meeting.groupCode}, 
        '${meeting.meetingStartDate}', 
        '${meeting.meetingEndDate}', 
        '${meeting.meetingDescription}', 
        '${meeting.meetingRoom}');
    `;
    const response: OkPacket = await dal_mysql.execute(sql);
    return response.insertId;
};

const getAllMeetings = async () => {
    const sql = `SELECT * FROM meeting.meetings`;
     return await dal_mysql.execute(sql);
}

const createMeetingTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS meeting.meetings (
        id INT NOT NULL AUTO_INCREMENT,
        groupCode VARCHAR(45) NOT NULL,
        meetingStartDate DATETIME NOT NULL,
        meetingEndDate DATETIME NOT NULL,
        meetingDescription VARCHAR(255) NULL,
        meetingRoom VARCHAR(45) NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (groupCode) REFERENCES developersgroup(id));
        `;
        
    const response = dal_mysql.execute(sql);
  };


  const getAllGroups = async () => {
    const sql = `SELECT * FROM meeting.developersgroup`;
    return await dal_mysql.execute(sql);
  };

  const getMeetingsByGroupId = async (groupId: number) => {
    const sql = `SELECT * FROM meeting.meetings WHERE groupCode = ${groupId}`;
    return await dal_mysql.execute(sql);
  };


export default {
    addMeeting,
    getAllMeetings,
    createMeetingTable,
    getAllGroups,
    getMeetingsByGroupId,
}