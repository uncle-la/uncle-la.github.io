
function processBarcode(param, inputName) {
  const codeReader = new ZXing.BrowserMultiFormatReader()
  const reader = new FileReader();
  fileObj = param.files[0]
  // imgSrc = URL.createObjectURL(fileObj)

  reader.readAsDataURL(fileObj);
  reader.onload = event => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = 10;
            elem.height = 10;
            const ctx = elem.getContext('2d');
            // img.width and img.height will contain the original dimensions
            ctx.drawImage(img, 0, 0, 10, 10);
            var test = ctx.canvas.toBlob((blob) => {
                const file = new File([blob], "fileName", {
                    type: 'image/jpeg',
                    lastModified: Date.now()
                });
            }, 'image/jpeg', 1);
            return test;
        },
        reader.onerror = error => console.log(error);
  };
        
  imgSrc = URL.createObjectURL(fileObj)

  codeReader.decodeFromImage(undefined, imgSrc).then((result) => {
      console.log(result)
      document.getElementById(inputName).value = result.text
  }).catch((err) => {
      console.error(err)
      document.getElementById(inputName).value = err
  })
  console.log(`Started decode for image from ${imgSrc}`)
}
