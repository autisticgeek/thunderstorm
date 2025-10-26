import { useEffect, useState, useRef, useCallback } from "react";

const thunderFiles = [
  "thunder01.mp3",
  "thunder02.mp3",
  "thunder03.mp3",
  "thunder04.mp3",
  "thunder05.mp3",
  "thunder06.mp3",
  "thunder07.mp3",
  "thunder08.mp3",
  "thunder09.mp3",
  "thunder10.mp3",
  "thunder11.mp3",
];

export default function StormSimulator() {
  const [flash, setFlash] = useState(false);
  const [flashIntensity, setFlashIntensity] = useState(0);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [muted, setMuted] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const thunderRefs = useRef([]);
  const mutedRef = useRef(muted);
  const unlockedRef = useRef(soundUnlocked);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    unlockedRef.current = soundUnlocked;
  }, [soundUnlocked]);

  const playSound = useCallback((src, refArray, volume = 1) => {
    if (!unlockedRef.current || mutedRef.current) return;
    const audio = new Audio(src);
    audio.loop = false;
    audio.volume = volume;
    audio.play();
    refArray.current.push(audio);
  }, []);

  const simulateStorm = useCallback(() => {
    const intensity = Math.random();
    setFlashIntensity(intensity);
    setFlash(true);
    setTimeout(() => setFlash(false), 100);

    if (mutedRef.current || !unlockedRef.current) return;

    const delay = 1500 - intensity * 1000;
    setTimeout(() => {
      if (mutedRef.current || !unlockedRef.current) return;
      const index = Math.floor(intensity * thunderFiles.length);
      const thunder = thunderFiles[index];
      const volume = Math.max(0.05, Math.pow(intensity, 2));
      playSound(`/sounds/${thunder}`, thunderRefs, volume);
    }, delay);
  }, [playSound]);

  useEffect(() => {
    const stormLoop = () => {
      const nextStrikeIn = Math.random() * 7000 + 3000;
      setTimeout(() => {
        simulateStorm();
        stormLoop();
      }, nextStrikeIn);
    };
    stormLoop();
  }, [simulateStorm]);

  useEffect(() => {
    let idleTimer;
    const hideCursor = () => {
      document.body.style.cursor = "none";
    };
    const showCursor = () => {
      document.body.style.cursor = "";
      clearTimeout(idleTimer);
      idleTimer = setTimeout(hideCursor, 2000);
    };

    window.addEventListener("mousemove", showCursor);
    idleTimer = setTimeout(hideCursor, 2000);

    return () => {
      window.removeEventListener("mousemove", showCursor);
      clearTimeout(idleTimer);
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowOverlay(false);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        setSoundUnlocked(true);
        setShowOverlay(false);
        setMuted((prev) => !prev);
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 5000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleUnlock = () => {
    setSoundUnlocked(true);
    setShowOverlay(false);
  };

  return (
    <div
      onClick={handleUnlock}
      style={{
        height: "100vh",
        backgroundColor: flash
          ? `rgba(180, 210, 255, ${flashIntensity})`
          : "black",
        transition: "background-color 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {showOverlay && !soundUnlocked && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Click or press space to enable sound
        </div>
      )}
      {soundUnlocked && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 20,
            fontSize: "0.9rem",
            zIndex: 5,
            pointerEvents: "none",
            color: showStatus ? "white" : "transparent",
            transition: "color 5s ease",
          }}
        >
          Sound: {muted ? "Muting" : "On"}
        </div>
      )}
    </div>
  );
}
