import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/login.mp4';
import logo from '../assets/logo.png';
import { client } from '../client';
import { useEffect } from 'react'; 
import { gapi } from 'gapi-script'; 

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const handleManualLogin = () => {
    // Perform any manual login logic here
    // For example, you can show a custom login form and handle login through your backend
    // Once the manual login is successful, you can navigate to the desired page
    navigate('/', { replace: true });
  };

  const responseGoogle = (response) => {
    if (response.profileObj) {
      // Handle successful login as before
      localStorage.setItem('user', JSON.stringify(response.profileObj));
      const { name, googleId, imageUrl } = response.profileObj;
      const doc = {
        _id: googleId,
        _type: 'user',
        userName: name,
        image: imageUrl,
      };

      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    } else {
      // Handle the case when profileObj is not available in the response
      console.error('User profile data not found in the response:', response);
      // Show a manual login button
  
        

    }
  };



  // const responseGoogle = (response) => {
  //   // Check if the profileObj property exists in the response object
  //   if (response.profileObj) {
  //     localStorage.setItem('user', JSON.stringify(response.profileObj));
  
  //     const { name, googleId, imageUrl } = response.profileObj;
  
  //     const doc = {
  //       _id: googleId,
  //       _type: 'user',
  //       // userName: name,
  //       image: imageUrl,
  //     };
  
  //     client.createIfNotExists(doc)
  //       .then(() => {
  //         navigate('/', { replace: true });
  //         // navigate('/')
  //       });
  //   } else {
  //     // Handle the case when profileObj is not available in the response
  //     console.error('User profile data not found in the response:', response);
  //   }
  // };
  
  return (


    
    <div className="flex justify-start items-center flex-col h-screen">
      <div className= "relative w-full h-full">
        
      <video
         src={shareVideo}
         type= "video/mp4"
         loop
         controls= {false}
         muted
        autoPlay
        className = "w-full h-full object-cover"
      />

   


      <div className= "absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className= "p-5">
          <button onClick={handleManualLogin} className="p-5">
              <img src={logo} width="130px" alt="logo" />
            </button>

        </div>

        <div className= "shadow=2xl"></div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                type= "button"
                className= "bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                onClick={renderProps.onClick}
                disabled= {renderProps.disabled}
              >
                <FcGoogle className= "mr-4" /> Sign in with Google

              </button> 

            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy= {'single_host_origin'}
            isSignedIn= {true}
          
          />




      </div>
    </div>
    </div>
  )
}

export default Login