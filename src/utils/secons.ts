export const msToTime = (duration: number | undefined) => {
  if (duration) {
    var milliseconds = parseInt(((duration % 1000) / 100).toString()),
      seconds: number | string = Math.floor((duration / 1000) % 60),
      minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
      hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  } else {
    return "00:00:00";
  }
};
