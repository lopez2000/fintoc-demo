import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FintocWidget() {
  const [widgetVisible, setWidgetVisible] = useState(false);

  useEffect(() => {
    if (widgetVisible) {
      const script = document.createElement('script');
      script.src = 'https://js.fintoc.com/v1/';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.Fintoc.create({
          publicKey: process.env.REACT_APP_FINTOC_PUBLIC_KEY,
          holderType: 'business',
          product: 'movements',
          webhookUrl: 'https://8847-190-216-144-178.ngrok-free.app', // Using ngrok URL from .env
          onSuccess: (link) => {
            console.log('Success!');
            console.log(link);
          },
          onExit: () => {
            console.log('Widget closing!');
            setWidgetVisible(false);
          },
          onEvent: (event) => {
            console.log('An event just happened!');
            console.log(event);
          },
        }).open(); // Automatically open the widget when loaded
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [widgetVisible]);

  const handleButtonClick = () => {
    setWidgetVisible(!widgetVisible);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {widgetVisible ? 'Close Widget' : 'Open Widget'}
      </button>
    </div>
  );
}

export default FintocWidget;
