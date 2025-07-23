// App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import './App.css';

export default function App() {
  const [room, setRoom] = useState('gate');

  const rooms = {
    gate: <HauntedGate onOpen={() => setRoom('intro')} />,
    intro: <Intro onEnter={() => setRoom('about')} />, 
    about: <MirrorRoom onNext={() => setRoom('skills')} />,
    skills: <WhisperingWalls onNext={() => setRoom('dsa')} />,
    dsa: <DungeonDSA onNext={() => setRoom('projects')} />, // NEW ROOM
    projects: <SecretPassage onNext={() => setRoom('achievements')} />,
    achievements: <Library onNext={() => setRoom('codingProfiles')} />,
    codingProfiles: <Attic onNext={() => setRoom('contact')} />,
    contact: <OuijaTable />
  };

  useEffect(() => {
    const ambientSound = new Howl({
      src: ['/ambient.mp3'],
      loop: true,
      volume: 0.3,
    });
    ambientSound.play();

    const updateCursor = e => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', updateCursor);
    return () => {
      ambientSound.stop();
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  return (
    <div className="app flashlight-cursor">
      <AnimatePresence mode='wait'>
        <motion.div
          key={room}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          {rooms[room]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function HauntedGate({ onOpen }) {
  const [open, setOpen] = useState(false);

  const handleOpenGate = (e) => {
    const doorSound = new Howl({ src: ['/door-creak.mp3'], volume: 0.8 });
    doorSound.play();
    setOpen(true);

    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <div className='gate-container'>
      <div className='door-wrapper'>
        {!open ? (
          <motion.img
            src='/closed-door.png'
            alt='Closed Gate'
            className='door-image'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenGate}
          />
        ) : (
          <motion.img
            src='/closed-door.png'
            alt='Opening Gate'
            className='door-image'
            initial={{ scale: 1, rotateY: 0 }}
            animate={{ scale: 1.2, rotateY: 90 }}
            transition={{ duration: 2 }}
          />
        )}

        <h1 className='gate-text-on-door'>☠️ CLICK TO ENTER ☠️
          <span className='blood-drip'></span>
          <span className='blood-drip delay1'></span>
          <span className='blood-drip delay2'></span>
        </h1>

      </div>
    </div>
  );
}

function Intro({ onEnter }) {
  return (
    <motion.div className="intro room" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="glitch-text">Shiva Marya</h1>
      <p>"Only the brave explore the unknown."</p>

      <a
        href="/Shiva_Marya_Resume.pdf"
        download
        className="download-resume-btn"
      >
        🧾 Download My Resume
      </a>

      <button onClick={onEnter}>Enter the Haunted Gates</button>
    </motion.div>
  );
}

function MirrorRoom({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>🪞 About Me</h2>
      <p>I am a passionate Software Engineer skilled in MERN stack, DSA, and real-world problem-solving. I blend creativity with code, and love exploring ideas like this horror house!</p>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function WhisperingWalls({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>💬 Skills & Tools</h2>
      <ul>
        <li>Languages: C++, JavaScript</li>
        <li>Frontend: React.js, Redux, HTML, CSS, Bootstrap, MUI</li>
        <li>Backend: Node.js, Express.js</li>
        <li>Databases: MongoDB, MySQL</li>
        <li>Tools: Git, GitHub, VS Code, Postman, Socket.IO</li>
      </ul>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function DungeonDSA({ onNext }) {
  return (
    <section className="room dsa-room flicker-hover">
      <h2>🧠 Problem Solving & DSA</h2>
      <p className="quote-text">
        “Calm under pressure like a vampire in sunlight — I debug with deadpan focus and solve problems like slaying monsters in the dark.”
      </p>
      <ul className="dsa-list">
        <li>💀 Solved <strong>500+ problems</strong> on <a href="https://www.geeksforgeeks.org/user/shivagfg/" target="_blank">GeeksforGeeks</a></li>
        <li>🧟‍♂️ Solved <strong>200+ problems</strong> on <a href="https://leetcode.com/u/Shiva-kant-marya/" target="_blank">LeetCode</a></li>
        <li>🏅 Ranked <strong>#2 in college</strong> on GFG Leaderboard</li>
      </ul>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function SecretPassage({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>🗝 Projects</h2>
      <ul>
        <li>Farmer Marketplace – <a href="https://github.com/Shivakantmarya/farmer-marketplace-mern-project">GitHub</a></li>
        <li>Notes App – <a href="https://github.com/Shivakantmarya/NotesApp">GitHub</a></li>
        <li>Todo App – <a href="https://github.com/Shivakantmarya/FullStack-Todos">GitHub</a></li>
      </ul>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function Library({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>🕸 Achievements</h2>
      <ul>
        <li>GeeksforGeeks Rank 2 – Institute Leaderboard</li>
        <li>Letter of Recommendation – CipherByte Internship</li>
        <li>Web Development Internship – CipherByte</li>
      </ul>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function Attic({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>👁 Coding Profiles</h2>
      <ul>
        <li><a href="https://www.geeksforgeeks.org/user/shivagfg/">GeeksforGeeks</a></li>
        <li><a href="https://leetcode.com/u/Shiva-kant-marya/">LeetCode</a></li>
      </ul>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function OuijaTable() {
  return (
    <section className="room flicker-hover">
      <h2>📞 Contact Me</h2>
      <p>Send your message through the spirits...</p>
      <form>
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send via Ouija</button>
      </form>
    </section>
  );
}
