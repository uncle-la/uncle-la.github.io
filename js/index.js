function loadFile() {
  const reader = new FileReader();

  return new Promise(function(resolve, reject) {
    reader.readAsDataURL(fileObj);
    reader.onload = event => {
      console.log("here")
      resolve(event)
    },
    reader.onerror = error => {
      console.log(error);
      reject()
    }
  });
}

function createImageFromFile(fileObj) {
  const reader = new FileReader();

  return new Promise(function(resolve, reject) {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      resolve(img)
    }
  });
}

function resizeImage(img) {
  const elem = document.createElement('canvas');
  const width = 1500;
  const scaleFactor = width / img.width;
  elem.width = width;
  elem.height = img.height * scaleFactor;

  const ctx = elem.getContext('2d');
  // img.width and img.height will contain the original dimensions
  ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);

  return new Promise(function(resolve, reject) {
    ctx.canvas.toBlob((blob) => {
     resolve(blob)
    }); 
  });
}

function createResizedImageFile(blob) {
  const file = new File([blob], "fileName", {
    type: 'image/jpeg',
    lastModified: Date.now()
  }, 'image/jpeg', 1);

  return file
}

function processBarcode(param, inputName) {
  const codeReader = new ZXing.BrowserMultiFormatReader()
  fileObj = param.files[0]
  // imgSrc = URL.createObjectURL(fileObj)

  loadFile().then(function(file) {
    createImageFromFile(file).then(function(image) {
      resizeImage(image).then(function(resizedImageBlob) {
        var resizedImageFile = createResizedImageFile(resizedImageBlob)
        imgSrc = URL.createObjectURL(resizedImageFile)
        console.log(resizedImageFile)

        codeReader.decodeFromImage(undefined, imgSrc).then((result) => {
            console.log(result)
            document.getElementById(inputName).value = result.text
        }).catch((err) => {
            console.error(err)
            document.getElementById(inputName).value = err
        })
        console.log(`Started decode for image from ${imgSrc}`)
        
      });
    });
  });
}
