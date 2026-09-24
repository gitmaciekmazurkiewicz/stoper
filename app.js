const timeEl = document.getElementById("time");
const resultEl = document.getElementById("result");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let startAt = 0;
let elapsed = 0;
let running = false;
let frameId = 0;

function formatTime(ms) {
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;
  const totalSeconds = Math.floor(totalCs / 100);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const pad = (n, size = 2) => String(n).padStart(size, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(cs)}`;
}

function render(ms) {
  timeEl.textContent = formatTime(ms);
}

function tick() {
  elapsed = performance.now() - startAt;
  render(elapsed);
  frameId = requestAnimationFrame(tick);
}

function start() {
  if (running) return;
  running = true;
  startAt = performance.now() - elapsed;
  resultEl.hidden = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  frameId = requestAnimationFrame(tick);
}

function stop() {
  if (!running) return;
  running = false;
  cancelAnimationFrame(frameId);
  elapsed = performance.now() - startAt;
  render(elapsed);
  resultEl.hidden = false;
  resultEl.textContent = `Zatrzymany czas: ${formatTime(elapsed)}`;
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function reset() {
  running = false;
  cancelAnimationFrame(frameId);
  elapsed = 0;
  render(0);
  resultEl.hidden = true;
  resultEl.textContent = "";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

render(0);
