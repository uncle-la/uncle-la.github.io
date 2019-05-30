function openQRCamera(param) {
  const codeReader = new ZXing.BrowserMultiFormatReader()
        
  fileObj = param.files[0]
  imgSrc = URL.createObjectURL(fileObj)

  codeReader.decodeFromImage(undefined, imgSrc).then((result) => {
      console.log(result)
      document.getElementById('serial-barcode').value = result.text
  }).catch((err) => {
      console.error(err)
      document.getElementById('serial-barcode').value = err
  })
  console.log(`Started decode for image from ${imgSrc}`)
}
