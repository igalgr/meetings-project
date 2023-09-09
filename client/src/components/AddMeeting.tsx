import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevelopersGroup, Meeting } from '../Models/Meeting';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMeeting = () => {
  const [groups, setGroups] = useState<DevelopersGroup[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/groups').then(res => {
      console.log(res.data);
      setGroups(res.data);
    });
  }, []);

  const addMeeting = async (data: any) => {
    const formattedData = {
      ...data,
      meetingStartDate: new Date(data.startDate).toISOString().slice(0, 19).replace('T', ' '),
      meetingEndDate: new Date(data.endDate).toISOString().slice(0, 19).replace('T', ' '),
    };
    try {
      const response = await axios.post('http://localhost:4000/api/meeting', formattedData);
      if (response.status === 200) {
        console.log('Meeting added successfully');
        navigate('/');
      } else {
        console.log('Failed to add meeting');
      }
    } catch (error) {
      console.log('Error adding meeting:', error);
    }
  };

  return (
    <div
      className="addForm">
      <h1>Add Meeting Zeev</h1>
      <form onSubmit={handleSubmit(addMeeting)}>
        <select {...register('groupCode', { required: true })}>
          <option value="choose class">choose class</option>
          {groups.map(item => (
            <option key={item.id} value={item.id}>
              {item.groupName}
            </option>
          ))}
        </select>
        <label>Room: </label>
        <input type="text" {...register('meetingRoom', { required: true })} />
        <label>Description: </label>
        <input type="text" {...register('meetingDescription', { required: true })} />
        <label>Start date: </label>
        <input type="datetime-local" {...register('startDate', { required: true })} />
        <label>End date: </label>
        <input type="datetime-local" {...register('endDate', { required: true })} />
        <button type="reset" onClick={() => navigate("/")}>Cancel</button>
        <button type='submit'>Add Meeting</button>
      </form>
    </div>
  );
};

export default AddMeeting;
