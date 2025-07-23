import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import "./App.css";

export default function App() {
  const [room, setRoom] = useState("loading");

  useEffect(() => {
    const timer = setTimeout(() => setRoom("gate"), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleRoomChange = (nextRoomSetter) => {
    const doorSound = new Howl({ src: ["/door-creak.mp3"], volume: 0.8 });
    doorSound.play();
    setTimeout(() => {
      nextRoomSetter();
    }, 1200);
  };

  const rooms = {
    loading: <LoadingScreen />,
    gate: (
      <HauntedGate onOpen={() => handleRoomChange(() => setRoom("intro"))} />
    ),
    intro: <Intro onEnter={() => handleRoomChange(() => setRoom("about"))} />,
    about: (
      <MirrorRoom onNext={() => handleRoomChange(() => setRoom("skills"))} />
    ),
    skills: (
      <WhisperingWalls
        onNext={() => handleRoomChange(() => setRoom("projects"))}
      />
    ),
    projects: (
      <SecretPassage
        onNext={() => handleRoomChange(() => setRoom("achievements"))}
      />
    ),
    achievements: (
      <Library
        onNext={() => handleRoomChange(() => setRoom("codingProfiles"))}
      />
    ),
    codingProfiles: (
      <Attic onNext={() => handleRoomChange(() => setRoom("contact"))} />
    ),
    contact: <OuijaTable />,
  };

  useEffect(() => {
    const ambientSound = new Howl({
      src: ["/ambient.mp3"],
      loop: true,
      volume: 0.3,
    });
    ambientSound.play();
    const updateCursor = (e) => {
      document.documentElement.style.setProperty(
        "--cursor-x",
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--cursor-y",
        `${e.clientY}px`
      );
    };
    window.addEventListener("mousemove", updateCursor);
    return () => {
      ambientSound.stop();
      window.removeEventListener("mousemove", updateCursor);
    };
  }, []);

  return (
    <div className="app flashlight-cursor">
      <video className="fog-video" autoPlay loop muted playsInline>
        <source src="/fog.mp4" type="video/mp4" />
      </video>
      <div className="ghost ghost-1" />
      <div className="ghost ghost-2" />
      <div className="ghost ghost-3" />
      <AnimatePresence mode="wait">
        <motion.div
          key={room}
          initial={{ opacity: 0, rotateY: -90, scale: 0.95 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 90, scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          {rooms[room]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <motion.h1
        className="glitch-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
      >
        Entering the Darkness...
      </motion.h1>
    </div>
  );
}

function HauntedGate({ onOpen }) {
  const [open, setOpen] = useState(false);
  const handleOpenGate = () => {
    const doorSound = new Howl({ src: ["/door-creak.mp3"], volume: 0.8 });
    doorSound.play();
    setOpen(true);
    setTimeout(() => onOpen(), 2000);
  };
  return (
    <div className="gate-container">
      <div className="door-wrapper">
        {!open ? (
          <motion.img
            src="/closed-door.png"
            alt="Closed Gate"
            className="door-image"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenGate}
          />
        ) : (
          <motion.img
            src="/closed-door.png"
            alt="Opening Gate"
            className="door-image"
            initial={{ scale: 1, rotateY: 0 }}
            animate={{ scale: 1.2, rotateY: 90 }}
            transition={{ duration: 2 }}
          />
        )}
        <h1 className="gate-text-on-door">
          ☠️ DON'T CLICK ☠️<span className="blood-drip"></span>
        </h1>
      </div>
    </div>
  );
}

function Intro({ onEnter }) {
  return (
    <motion.div
      className="intro room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="glitch-text">Shiva Marya</h1>
      <p>
        "Only the brave explore the unknown."
        <br />
        Calm under pressure like a vampire in sunlight.
      </p>
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
      <h2>🪞 Mirror of Truth</h2>
      <p>
        I'm Shiva Kant Marya, an aspiring Software Engineer who thrives on
        building eerie-smooth experiences and solving problems in the dead of
        night. I embrace challenge and enjoy coding like conjuring spells.
      </p>

      <p className="quote-text">
        What stares back is a builder, not a bystander. 🔥
      </p>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function WhisperingWalls({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>💬 Whispering Walls</h2>
      <ul>
        <li>JavaScript / React.js / Node.js</li>
        <li>Express.js / MongoDB / MySQL</li>
        <li>HTML / CSS / Tailwind</li>
        <li>C++ (DSA: 500+ GFG / 200+ LeetCode)</li>
        <li>Git / GitHub / Postman / Render</li>
      </ul>

      <p className="quote-text">
        These are the spells I cast daily — my dev tools. 🔥
      </p>

      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function SecretPassage({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>🔧 Chamber of Creations</h2>
      <p className="quote-text">Crafted with madness. Shaped by purpose.</p>
      <ul>
        <li>
          🌾 <strong>Farmer Marketplace</strong> – A full-stack e-commerce
          platform empowering local farmers to sell directly.
          <a
            href="https://github.com/Shivakantmarya/farmer-marketplace-mern-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          📝 <strong>Notes App</strong> – A secure and responsive productivity
          app built with MERN stack, with JWT authentication and CRUD features.
          <a
            href="https://github.com/Shivakantmarya/NotesApp"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          ✅ <strong>Todo App</strong> – A full-stack task management app with
          real-time updates, designed to be minimal yet powerful with secure
          Sign Up/Login functionality, built using React, Node.js, and MongoDB.
          <a
            href="https://github.com/Shivakantmarya/FullStack-Todos"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
      <p className="quote-text">
        Every project is crafted with purpose, performance, and a pinch of
        madness. 🔥
      </p>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function Library({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>🏆 Hall of Relics</h2>
      <ul>
        <li>🏆 GeeksforGeeks Institute Rank #2</li>
        <li>📜 LOR from CipherByte Internship</li>
      </ul>

      <p className="quote-text">
        Where recognition glows, and shadows whisper past wins.
      </p>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function Attic({ onNext }) {
  return (
    <section className="room flicker-hover">
      <h2>⚔️ Battle Ground</h2>
      <p className="quote-text">
        This is where I fight demons — one bug, one edge case, one time
        complexity at a time.
      </p>
      <ul className="dsa-list">
        <li>
          <a
            href="https://www.geeksforgeeks.org/user/shivagfg/"
            target="_blank"
            rel="noopener noreferrer"
          >
            👨‍💻 GeeksforGeeks – 500+ DSA problems solved, Rank 2 in my institute.
          </a>
        </li>
        <li>
          <a
            href="https://leetcode.com/u/Shiva-kant-marya/"
            target="_blank"
            rel="noopener noreferrer"
          >
            🧠 LeetCode – 200+ challenges completed. Strategic. Precise.
            Unstoppable.
          </a>
        </li>
      </ul>
      <p className="quote-text">
        Calm under pressure like a vampire in sunlight. ⚰️
      </p>
      <button onClick={onNext}>Next Room</button>
    </section>
  );
}

function OuijaTable() {
  return (
    <section className="room flicker-hover">
      <h2>☎️ Spirit Link</h2>
      <p>Send your message through the spirits...</p>
      <form action="https://formsubmit.co/maryashiva07@gmail.com" method="POST">
        <input type="text" name="name" required placeholder="Your Name" />
        <input type="email" name="email" required placeholder="Your Email" />
        <textarea name="text" placeholder="Your Message"></textarea>
        <button type="submit">Send via Ouija</button>
      </form>
      <p className="quote-text">Summon me through the digital veil...</p>
    </section>
  );
}
