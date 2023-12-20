const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');
    let brushSize = 5;
    let currentColor = '#000';

    function changeBrushSize(size) {
      brushSize = size;
    }

    function changeColor(event) {
      currentColor = event.target.value;
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function saveImage() {
      const dataURL = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'my_painting.png';
      a.click();
    }

    let painting = false;

    function startPosition(e) {
      painting = true;
      draw(e);
    }

    function endPosition() {
      painting = false;
      ctx.beginPath();
    }

    function draw(e) {
      if (!painting) return;

      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.strokeStyle = currentColor;

      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = currentColor;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);