import { onCreate, onDraw } from "./gameloop";
import scaffoldPage from "./scaffoldPage";

const el = document.querySelector("#app")!;
scaffoldPage(el);

const cnv = document.querySelector("canvas")!;

onCreate(cnv);
var lastLoop = (new Date()).getMilliseconds();
var count = 1;
var fps = 0;
setInterval(() => {
  
  window.requestAnimationFrame(() => {
    onDraw(cnv);

    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    document.querySelector("#fps")!.innerHTML = `${fps}`;
  })
}, 1);

