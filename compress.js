function compressImage() {
  const upload = document.getElementById('upload').files[0];
  const canvas = document.getElementById('canvas');
  const downloadLink = document.getElementById('downloadLink');

  if (!upload) {
    alert('Please upload an image first.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      const ctx = canvas.getContext('2d');
      const scale = 0.5; // 50% size reduction
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.style.display = 'inline';
        downloadLink.innerText = 'Download Compressed Image';
      }, 'image/jpeg', 0.7);
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(upload);
}
