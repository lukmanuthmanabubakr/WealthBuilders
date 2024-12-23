import React, { useEffect } from 'react';
import './InfoBox.css'
import { BiUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { CALC_SUSPENDED_USER, CALC_VERIFIED_USER } from '../../redux/features/auth/authSlice';

const InfoBox = () => {
    const dispatch = useDispatch();
    const { users, verifiedUsers, suspendedUsers } = useSelector(
      (state) => state.auth
    );
    const unverifiedUsers = users.length - verifiedUsers;
  
    useEffect(() => {
      dispatch(CALC_VERIFIED_USER());
      dispatch(CALC_SUSPENDED_USER());
    }, [dispatch, users]);
  return (
    <div className='infoBox'>
        <h2>User Stats</h2>
        <div className='infoContainer'>
            <div className='theInfoBox'>
                <span className='iIcon'><FaUsers /></span>
                <span className='infoDeatils'>
                    <p className='infoText'>Total Users</p>
                    <p className='num'>{users.length}</p>
                </span>
            </div>
            <div className='theInfoBox'>
                <span className='iIcon'><BiUserCheck /></span>
                <span className='infoDeatils'>
                    <p className='infoText'>Verified Users</p>
                    <p className='num'>{verifiedUsers}</p>
                </span>
            </div>
            <div className='theInfoBox'>
                <span className='iIcon'><BiUserMinus/></span>
                <span className='infoDeatils'>
                <p className='infoText'>Unverified  Users</p>
                <p className='num'>{unverifiedUsers}</p>
                </span>
            </div>
            <div className='theInfoBox'>
                <span className='iIcon'><BiUserX/></span>
                <span className='infoDeatils'>
                <p className='infoText'>Suspended Users</p>
                <p className='num'>{suspendedUsers}</p>
                </span>
            </div>
        </div>
    </div>
  )
}

export default InfoBox