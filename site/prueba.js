let img = 1

const imagenes = []

for (let i = 1; i <= 100; i++) {
  let imagen = {
    imgName: img,
    productId: i
  }
    if (img === 20) {
        img = 0
      }

      ++img

  imagenes.push(imagen)

  imagen = {
    imgName: img,
    productId: i
  }

  if (img === 20) {
    img = 0
  }

  ++img

  imagenes.push(imagen)
}
console.log(imagenes);