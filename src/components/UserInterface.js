import React, { useEffect, useState } from "react";
import shipLength from './Ship.js';
import '../styles/gameboard.css';
import uniqid from 'uniqid';

const UserInterface = () => {
  const [shipCoordinates, setShipCoordinates] = useState('');
  const [newBoard, setNewBoard] = useState([]);

}