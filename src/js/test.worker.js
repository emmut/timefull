self.addEventListener('message', startCounter);

function startCounter(event) {
  console.log(event.data, self);
  let initial = event.data;
  setInterval(() => self.postMessage(initial++), 1000);
}
