import axios from 'axios';
import { useEffect, useState } from 'react';
import { DevelopersGroup, Meeting } from '../Models/Meeting';
import { group } from 'console';
import { on } from 'events';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [groups, setGroups] = useState<DevelopersGroup[]>([]);
  const navigate = useNavigate();
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  useEffect(() => {
    axios.get('http://localhost:4000/api/meetings').then(response => {
      setMeetings(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:4000/api/groups').then(res => {
      console.log(res.data);
      setGroups(res.data);
    });
  }, []);

  const getAllMeetings = () => {
    axios.get('http://localhost:4000/api/meetings').then(res => {
      console.log(res.data);
      setMeetings(res.data);
    });
  };

  const meetingByGroupID = (groupID: any) => {
    if (groupID === 'all') {
      getAllMeetings();
    } else {
      axios.get(`http://localhost:4000/api/meetings/${groupID}`).then(res => {
        console.log(res.data);
        setMeetings(res.data);
      });
    }
  };

  return (
    <>
      <div className="addNewMeeting">
        <button onClick={() => navigate('/addMeeting')}>add new meeting</button>
      </div>
      <div className="selectBox">
        <label>
          Select group:
          <select onChange={args => meetingByGroupID(args.target.value)}>
            <option value="all">all meetings</option>
            {groups.map(item => (
              <option key={item.id} value={item.id}>
                {item.groupName}
              </option>
            ))}
            ;
          </select>
        </label>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Meeting Description</th>
              <th>Meeting Room</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map(item => (
              <tr key={item.id}>
                <td>{dateFormatter.format(new Date(item.meetingStartDate))}</td>
                <td>{dateFormatter.format(new Date(item.meetingEndDate))}</td>
                <td>{item.meetingDescription}</td>
                <td>{item.meetingRoom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Main;
