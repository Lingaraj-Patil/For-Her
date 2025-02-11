import React, { useState, useEffect, useRef } from 'react';
import { Heart, HeartHandshake, Baby, BellRing as Ring, Home, Calendar, Check, X, Pen, Music, Music2, Instagram, Linkedin, Twitter,VolumeX } from 'lucide-react';
import tumHo from "./assets/Tum Ho Rockstar 320 Kbps.mp3";
import tereNaina from "./assets/terenainam_sr2v1q1r.mp3";
import mereHaath from "./assets/merehaathmeinfullsongringtone-46114.mp3";
import hug from "./assets/naaninnabi_n7ia7606.mp3";
import ishqHein from "./assets/Ishq-Hai-Ye-Ishq-Hai-Ringtone-iRingZone.com_.mp3";
import abhiNaJao from "./assets/Abhi Na Jao Chhod Kar - Hum Dono (1962) 320 Kbps.mp3";
import iThinkThey from "./assets/i-think-they-call-this-love-oldringtones.net.mp3";
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(''));
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const timelineRefs = useRef([]);
  const audioRef = useRef(new Audio(tumHo));
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const timeline = [
    {
      date: "First Meet",
      description: "The day our eyes met and hearts connected",
      icon: <Heart className="w-6 h-6 text-red-500" />,
      image: "https://i.pinimg.com/474x/d2/c2/9e/d2c29ecb25a16addc0e3f79a6c0a6a90.jpg",
      music: tereNaina,
      musicMessage: "Play the melody of our first encounter"
    },
    {
      date: "First Hand Hold",
      description: "When our fingers intertwined for the first time",
      icon: <HeartHandshake className="w-6 h-6 text-red-500" />,
      image: "https://i.pinimg.com/474x/df/69/bf/df69bf2bcbb0695d5ebc73cf334abee1.jpg",
      music: mereHaath,
      musicMessage: "Listen to our heartbeats sync"
    },
    {
      date: "First Hug",
      description: "The warmest embrace that melted our hearts",
      icon: <Heart className="w-6 h-6 text-red-500" />,
      image: "https://i.pinimg.com/474x/94/1c/ea/941cea4d7b0b4ba29eac973cefb431dc.jpg",
      music: hug,
      musicMessage: "Feel the warmth of our embrace"
    },
    {
      date: "Marriage",
      description: "The day we'll unite our souls forever",
      icon: <Ring className="w-6 h-6 text-red-500" />,
      image: "https://i.pinimg.com/474x/35/dc/9e/35dc9e72d2ee9cf0dffde88d0c01906f.jpg",
      music: ishqHein,
      musicMessage: "Our wedding bells ring eternal"
    },
    {
      date: "First Child",
      description: "When our love creates a miracle",
      icon: <Baby className="w-6 h-6 text-red-500" />,
      image: "https://i.pinimg.com/474x/c6/b0/17/c6b01743531cf30abf23722b0dd7864c.jpg",
      music: iThinkThey,
      musicMessage: "Moment When My Love Towards You Increase"
    },
    {
      date: "Growing Old Together",
      description: "Walking hand in hand through the beautiful journey of growing old together",
      icon: <Home className="w-6 h-6 text-red-500" />,
      image: "https://i.pinimg.com/474x/5d/44/18/5d4418c42dfb0684a83c9608d9052ea5.jpg",
      music: abhiNaJao,
      musicMessage: "The soundtrack of our forever"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswers.some(answer => answer === '')) {
      alert('Please answer all questions before submitting!');
      return;
    }
    
    let newScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setQuizCompleted(true);
  };

  const handleNameSubmit = async () => {
    if (!name || name.trim() === '') {
      alert('Please enter your name first!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/names', { name });
      if (response.status === 201) {
        setNameSubmitted(true);
      }
    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  const handlePlay = (date: string) => {
    // Stop any currently playing audio
    if (playingAudio) {
      const currentAudio = document.getElementById(playingAudio) as HTMLAudioElement;
      currentAudio?.pause();
      currentAudio.currentTime = 0;
    }
    
    // Play new audio if clicking a different moment
    if (playingAudio !== date) {
      const newAudio = document.getElementById(date) as HTMLAudioElement;
      newAudio?.play();
      setPlayingAudio(date);
    } else {
      // If clicking the same moment, just stop it
      setPlayingAudio(null);
    }
  };

  const quizQuestions = [
    {
      question: "If you were to choose, which character do you think I would accept as you?",
      options: [
        "The talkative and chirpy Geet from Jab We Met",
        "The padhaku and ambitious Naina from Yeh Jawaani Hai Deewani",
        "The unpredictable and ajeeb Heer from Rockstar",
        "All of the above"
      ],
      correctAnswer: "All of the above"
    },
    {
      question: "What do you think I like the most?",
      options: [
        "Gym",
        "Party",
        "Binge-watching shows",
        "Late-night snacking"
      ],
      correctAnswer: "Gym"
    },
    {
      question: "What's the key to a lasting relationship?",
      options: [
        "Never going to bed angry",
        "Trust and communication",
        "Sharing all hobbies",
        "Having separate lives"
      ],
      correctAnswer: "Trust and communication"
    },
    {
      question: "How would we handle disagreements?",
      options: [
        "Talk it out calmly and listen",
        "Take space then discuss",
        "Seek compromise immediately",
        "Write down our feelings"
      ],
      correctAnswer: "Talk it out calmly and listen"
    },
    {
      question: "What's your idea of romance?",
      options: [
        "Grand gestures and surprises",
        "Small daily acts of love",
        "Planned date nights",
        "Spontaneous adventures"
      ],
      correctAnswer: "Small daily acts of love"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fff5f5]">
      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        className="fixed z-50 p-3 text-white transition-all duration-300 bg-red-600 rounded-full shadow-lg top-4 right-4 hover:bg-red-700 hover:scale-110"
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? <Music2 className="w-6 h-6" /> : <Music className="w-6 h-6" />}
      </button>

      {/* Hero Section with Letter */}
      <div className="max-w-4xl px-4 py-20 mx-auto">
        <div className="p-12 transition-transform duration-300 transform bg-white rounded-lg shadow-xl rotate-1 hover:rotate-0" 
             style={{backgroundImage: "linear-gradient(0deg, #fff 9%, transparent 9%, transparent 91%, #fff 91%), linear-gradient(90deg, #fff 9%, transparent 9%, transparent 91%, #fff 91%), linear-gradient(#f0f0f0 .1em, transparent .1em), linear-gradient(90deg, #f0f0f0 .1em, transparent .1em)",
                     backgroundSize: "10px 10px"}}>
          <div className="letter-content">
            <h1 className="mb-8 text-5xl text-red-600 handwritten">Dear Baiko,</h1>
            <div className="space-y-6 text-xl leading-relaxed text-gray-700 handwritten">
              <p>As I write this, I don't know your name, your smile, or the sound of your laugh—but I know you are out there, and someday our paths will cross. That thought alone fills me with hope and excitement.</p>
              <p>I don't know where life will take us or how we'll meet, but when I imagine us together, I see a bond built on love, trust, and understanding. I promise to cherish the person you are—your strengths, your quirks, and the beautiful imperfections that make you uniquely you.</p>
              <p>I want to share with you all the highs and lows of life, to celebrate the victories and hold your hand through the storms. I want to laugh with you until our sides hurt and create a home filled with warmth, love, and joy.</p>
              <p>More than anything, I promise to always be honest, to listen with an open heart, and to never stop learning and growing with you. Marriage isn't just about the vows we'll say one day; it's about the journey we'll take together, each step forward strengthening our connection.</p>
              <p>Until the day we meet, know that I am working on being the best version of myself—not perfect, but someone who can stand beside you as an equal partner, a loyal friend, and a loving husband.</p>
            </div>
            <div className="mt-12 text-right">
              <h3 className="mb-4 text-2xl text-red-600 handwritten">I'm saving all my love for you,</h3>
              <h2 className="text-3xl text-red-600 handwritten">Your Future Husband</h2>
            </div>
            <div className="absolute -bottom-4 -right-4">
              <Pen className="w-8 h-8 text-red-400 transform rotate-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline with larger images */}
      <div className="min-h-screen px-4 py-12 bg-[#fff5f5] sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center text-gray-900">This Could Be Us</h1>
        <div className="space-y-8">
          {timeline.map((moment, index) => (
            <div key={moment.date} className="relative">
              {index !== timeline.length - 1 && (
                <div className="absolute left-8 top-14 h-full w-0.5 bg-gray-200" />
              )}
              <div className="relative flex items-start space-x-4">
                <div className="p-2 bg-white rounded-full shadow-md">
                  {moment.icon}
                </div>
                <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{moment.date}</h3>
                    <button
                      onClick={() => handlePlay(moment.date)}
                      className="flex items-center space-x-2 text-pink-500 transition-colors hover:text-pink-600"
                    >
                      {playingAudio === moment.date ? (
                        <>
                          <VolumeX className="w-5 h-5" />
                          <span className="text-sm">Stop Music</span>
                        </>
                      ) : (
                        <>
                          <Music className="w-5 h-5" />
                          <span className="text-sm">{moment.musicMessage}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mb-4 text-gray-600">{moment.description}</p>
                  <img
                    src={moment.image}
                    alt={moment.date}
                    className="object-cover w-full rounded-lg h-96"
                  />
                  <audio id={moment.date} src={moment.music} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Requirements and Offerings Section */}
      <div className="max-w-6xl px-4 py-16 mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          {/* What I Need From You */}
          <div className="p-8 transition-all duration-500 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-red-600 handwritten">What I Need From You</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-xl handwritten">
                <Heart className="flex-shrink-0 w-6 h-6 text-red-500" />
                <span>Only You and a Promise of Forever Together</span>
              </li>
              
            </ul>
          </div>

          {/* What I Offer You */}
          <div className="p-8 transition-all duration-500 bg-white rounded-lg shadow-lg hover:shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-center text-red-600 handwritten">What I Offer You</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-xl handwritten">
                <Heart className="flex-shrink-0 w-6 h-6 text-red-500" />
                <span>Unwavering Support</span>
              </li>
              <li className="flex items-center gap-3 text-xl handwritten">
                <Heart className="flex-shrink-0 w-6 h-6 text-red-500" />
                <span>Unconditional Lover And Support</span>
              </li>
              <li className="flex items-center gap-3 text-xl handwritten">
                <Heart className="flex-shrink-0 w-6 h-6 text-red-500" />
                <span>Trust And Loyalty</span>
              </li>
              <li className="flex items-center gap-3 text-xl handwritten">
                <Heart className="flex-shrink-0 w-6 h-6 text-red-500" />
                <span>Efforts To Make You Happy</span>
              </li>
              <li className="flex items-center gap-3 text-xl handwritten">
                <Heart className="flex-shrink-0 w-6 h-6 text-red-500" />
                <span>A Shared Journey Of Growth</span>
              </li>
              <li className="flex items-center gap-3 text-xl handwritten">
                <Heart className="flex-shrink-0 w-6 h-6 text-red-500" />
                <span>And Much More...</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pookie Quiz */}
      <div className="max-w-2xl px-4 py-12 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-red-600 animate-float handwritten">
          My Questions For You
        </h2>
        {!quizCompleted ? (
          <div className="p-8 transition-all duration-500 transform bg-white rounded-lg shadow-lg hover:shadow-xl">
            {quizQuestions.map((q, index) => (
              <div key={index} className="mb-8">
                <h3 className="mb-4 text-xl font-semibold handwritten">{q.question}</h3>
                <div className="space-y-2">
                  {q.options.map((option, optIndex) => (
                    <button
                      key={optIndex}
                      onClick={() => handleAnswerSelect(index, option)}
                      className={`w-full text-left p-3 rounded border transition-all duration-300 hover:scale-105 hover:shadow-md handwritten
                        ${selectedAnswers[index] === option 
                          ? 'bg-red-100 border-red-500 text-red-700' 
                          : 'border-red-200 hover:bg-red-50'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleQuizSubmit}
              className="w-full py-3 mt-6 text-xl font-semibold text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105 handwritten"
            >
              Submit Your Answers
            </button>
          </div>
        ) : (
          <div className="p-8 text-center transition-all duration-500 transform bg-white rounded-lg shadow-lg hover:scale-105">
            <h3 className="mb-4 text-2xl font-bold handwritten">Quiz Results</h3>
            <p className="mb-4 text-xl handwritten">Your compatibility score: {score}/{quizQuestions.length}</p>
            <p className="text-xl text-red-600 animate-float handwritten">
              {score === quizQuestions.length 
                ? "Our hearts beat as one! We're destined to be together! 💑" 
                : "Love finds a way! Our differences make us stronger! ❤️"}
            </p>
          </div>
        )}
      </div>

      {/* Name Form */}
      <div className="max-w-md px-4 py-12 mx-auto">
      <div className="p-8 transition-all duration-500 transform bg-white rounded-lg shadow-lg hover:shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-red-600 handwritten">Tell Me Your Name, My Love</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 transition-all duration-300 border border-red-200 rounded focus:outline-none focus:ring-2 focus:ring-red-400 handwritten"
          />
          <button
            onClick={handleNameSubmit}
            className="w-full py-3 text-xl font-semibold text-white transition-all duration-300 bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105 handwritten"
          >
            Share Your Name
          </button>
        </div>
        {nameSubmitted && name && (
          <div className="mt-4 text-center animate-fadeIn">
            <p className="text-xl text-red-600 animate-float handwritten">
              {name}, you make my heart skip a beat! ❤️
            </p>
            <p className="mt-2 text-lg text-red-500 handwritten">
              Our love story is about to begin...
            </p>
          </div>
        )}
      </div>
    </div>


      {/* Footer */}
      <footer className="py-12 text-white bg-red-600">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-2xl transition-all duration-300 hover:scale-110 handwritten">
                Created with love by Lingaraj Patil
              </p>
              <p className="mt-2 text-lg handwritten">
                © {new Date().getFullYear()} - May our love story starts
              </p>
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/lingaraj.v.patil/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 transition-all duration-300 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/lingaraj-patil-771bb1255/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 transition-all duration-300 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/LingarajVPatil"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 transition-all duration-300 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;