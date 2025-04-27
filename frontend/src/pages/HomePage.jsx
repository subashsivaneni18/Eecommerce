import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import BestSeller from '../components/BestSeller';
import Policy from '../components/Policy';
import EmailSubscription from '../components/EmailSubscription';

const HomePage = () => {

  const [userToken,setUserToken] = useState(localStorage.getItem('userToken')?localStorage.getItem('userToken'):'')



  if(userToken===''){
    window.location.href = '/login'
  }

  

  return (
    <div>
      <div>
        <Hero/>
        <LatestCollections />
        <BestSeller/>
        <Policy/>
        <EmailSubscription/>
      </div>
    </div>
  );
}

export default HomePage
