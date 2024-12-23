import React from 'react';
import { useSelector } from 'react-redux';
import MainDashBoard from '../MainDashBoard/MainDashBoard';
import PaymentLinks from '../PaymentLinks/PaymentLinks';
import "./dashLinks.css";
import Advert from '../Advert/Advert';
import Notification from '../../components/Notification/Notification';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import PaymentLoader from '../PaymentLoader/PaymentLoader';

const DashLink = () => {
  // Get states from the Redux store
  const { user } = useSelector((state) => state.auth);
  const isVerified = user?.isVerified;

  useRedirectLoggedOutUser("/login");


  return (
    <>
      {isVerified === false && <Notification />}
      <div className='dashLinks'>
        <MainDashBoard />
        <Advert />
        <PaymentLinks />
      </div>
    </>
  );
};

export default DashLink;
