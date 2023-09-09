export interface DevelopersGroup {
    id: number;
    groupName: string;
  }
  
  export interface Meeting {
    id: number;
    groupCode: number;
    meetingStartDate: Date;
    meetingEndDate: Date;
    meetingDescription: string;
    meetingRoom: string;
  }