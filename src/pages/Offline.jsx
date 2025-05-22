// src/pages/Offline.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonBelow from '../components/Buttons/ButtonBelow';

export const Offline = () => {
  const navigate = useNavigate();
  return (
    <div className="offline-page">
        <h1>No connection to the server</h1>
        <h2>Dear user</h2>
        <p>We apologize for the inconvenience. Our server is currently down. Please try again later. We appreciate your understanding and patience while we resolve this situation.</p>
        <p>Thank you for your cooperation.</p>
        <ButtonBelow icon="exit_to_app" text={"Log out"} click={() => navigate("/login")} clas={"buttonBelowCreate"}/>
    </div>
  );
};

export default Offline;