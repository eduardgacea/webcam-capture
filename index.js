const video = document.getElementById('video-element');
const canvas = document.getElementById('canvas-element');
const captureBtn = document.getElementById('capture-btn');
canvas.width = video.width;
canvas.height = video.height;
video.style.display = 'none';

navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
  video.srcObject = stream;
  const ctx = canvas.getContext('2d');

  captureBtn.addEventListener('click', () => {
    // === JPEG FORMAT === //
    const pixelArray = Array.from(draw());
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    const imageData = context.createImageData(640, 480);
    imageData.data.set(pixelArray);
    context.putImageData(imageData, 0, 0);
    const image = new Image();
    image.src = canvas.toDataURL('image/jpeg', 0.5);
    const downloadLink = document.createElement('a');
    downloadLink.download = 'image.jpeg';
    downloadLink.href = image.src;
    downloadLink.click();

    // === PPM FORMAT === //
    // const imgDataHeader = 'P3\n640 480\n255';
    // let pixels = Array.from(draw().filter((curr, idx) => idx % 4 !== 3));
    // let pixelsJpeg = Array.from(draw());
    // let imgDataBody = '';
    // let idx = 0;
    // while (idx < 3 * 640 * 480) {
    //   if (idx % 1920 === 1919) {
    //     imgDataBody += '\n' + pixels[idx] + ' ';
    //   } else {
    //     imgDataBody += pixels[idx] + ' ';
    //   }
    //   idx++;
    // }
    // const imgData = imgDataHeader + '\n' + imgDataBody;
    // const blob = new Blob([imgData], { type: 'text/plain' });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'test.ppm';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // URL.revokeObjectURL(url);
    // ===== //
  });

  function draw() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(draw);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 3; i < pixels.length; i += 4) {
      const r = pixels[i - 3];
      const g = pixels[i - 2];
      const b = pixels[i - 1];
      const a = pixels[i];
      // RED
      pixels[i - 3];
      // GREEN
      pixels[i - 2];
      // BLUE
      pixels[i - 1];
      // ALPHA
      pixels[i];
    }

    ctx.putImageData(imageData, 0, 0);
    return pixels;
  }

  requestAnimationFrame(draw);
});
