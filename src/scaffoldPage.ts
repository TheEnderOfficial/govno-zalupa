export default function scaffoldPage(mount: Element) {
    mount.innerHTML = `
    <canvas id="gameCanvas" width="640px" height="480px"></canvas>
    <p>Game FPS: <span id="fps"></span></p>
`;
    
}