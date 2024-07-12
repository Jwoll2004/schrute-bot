import React, { useEffect } from 'react';
import './styles/Header.css';
import dwightGif from '../assets/images/dwight.mp4';

function Header() {
  useEffect(() => {
    const videos = document.querySelectorAll('.video');

    videos.forEach(video => {
      const handleMouseEnter = () => video.play();
      const handleMouseLeave = () => video.pause();

      video.addEventListener('mouseenter', handleMouseEnter);
      video.addEventListener('mouseleave', handleMouseLeave);

      // Cleanup event listeners on component unmount
      return () => {
        video.removeEventListener('mouseenter', handleMouseEnter);
        video.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <header className='section'>
      <div className='header-title'>
        <h1>Schrute Bot</h1>
      </div>

      <div className='header-description'>
        <p>Welcome to the Schrute Bot - a bot that resembles Dwight Schrute from the TV show The Office. 
          You can ask Schrute Bot questions or simply chat with the bot and it will respond in the unique style of Dwight Schrute.
        </p>
      </div>

	  <div className='video-instruction'>
		<p>Hover over the video below to see Dwight in action!</p>
	  </div>

      <video muted className='video'>
        <source src={dwightGif} type='video/mp4' />
      </video>
    </header>
  );
}

export default Header;
