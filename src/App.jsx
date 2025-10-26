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

  const thunderRefs = useRef([]);

  const playSound = useCallback((src, refArray, volume = 1) => {
    const audio = new Audio(src);
    audio.loop = false;
    audio.volume = volume;
    audio.play();
    refArray.current.push(audio);
  }, []);

  const simulateStorm = useCallback(() => {
    const intensity = Math.random(); // 0 (dim) to 1 (bright)
    setFlashIntensity(intensity);
    setFlash(true);
    setTimeout(() => setFlash(false), 100);

    const delay = 1500 - intensity * 1000; // brighter = shorter delay
    setTimeout(() => {
      const index = Math.floor(intensity * thunderFiles.length);
      const thunder = thunderFiles[index];

      // Simulate distance-based volume loss
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
      idleTimer = setTimeout(hideCursor, 2000); // 2 seconds idle
    };

    window.addEventListener("mousemove", showCursor);
    idleTimer = setTimeout(hideCursor, 2000);

    return () => {
      window.removeEventListener("mousemove", showCursor);
      clearTimeout(idleTimer);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: flash
          ? `rgba(180, 210, 255, ${flashIntensity})` // pale blue
          : "black",
        transition: "background-color 0.2s ease",
        position: "relative",
      }}
    />
  );
}
