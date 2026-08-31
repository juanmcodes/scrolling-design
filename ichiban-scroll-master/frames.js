import { images } from './images.js'

// Frames maximos
const MAX_FRAMES = 151

// Elemento main
const main = document.querySelector('main')
// Elemento grid-container
const gridContainer = document.getElementById('grid-container')
// Elemento scroll-dwn
const scollDwn = document.getElementById('scroll-dwn')

// Crer lineas en html
const createLine = () => {
  document.querySelectorAll('.line').forEach((line, index) => {
    const numLines = index === 0 ? 8 : 4
    for (let i = 0; i < numLines; i++) {
      const lineElement = document.createElement('div')
      lineElement.classList.add('under-line')
      if (i === numLines - 1) {
        lineElement.classList.add('last-line')
      }
      line.appendChild(lineElement)
    }
  })
}

createLine()

// Frame actual
let currentFrame = 0

// Actualizar el src de la imagen con la propiedad .p de images.js
function updateImage(frame = 0) {
  const src = images[frame].p
  img.src = src
}

// Empezar con la primera imagen
const img = document.createElement('img')

// Append img a main
main.appendChild(img)
updateImage(currentFrame)

// Altura maxima del scroll
const maxScroll = document.documentElement.scrollHeight - window.innerHeight

// Ajustar el altura maxima del scroll si cambia el tamaño de la pantalla
window.addEventListener('resize', () => {
  maxScroll = document.documentElement.scrollHeight - window.innerHeight
})

// Ultimo frame
let lastFrameUpdate = 0

// Evento scroll
window.addEventListener('scroll', () => {
  // Comprobar el ultimo frame
  if (Date.now() - lastFrameUpdate < 1) return true
  // Actualizamos el contador
  lastFrameUpdate = Date.now()
  // Posición actual de scroll
  const scrollPosition = window.scrollY
  // Calcular el porcentaje del scroll
  const scrollFraction = scrollPosition / maxScroll
  // Calculamos que frame toca ahora
  const frame = Math.floor(scrollFraction * MAX_FRAMES)
  // Si el frame que le toca es el mismo que ya tenia evitamos actualizar
  if (currentFrame !== frame) {
    // Creamos el id del nombre del archivo
    updateImage(frame)
    currentFrame = frame
  }

  // Sroll vertical
  const scrollY = window.scrollY
  // Opacidad inicial
  const fadeStart = 0
  // Opacidad final
  const fadeEnd = 600

  // Normalizacion entre 1 - 0
  let opacity = 1 - Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart))
  // Aplicar efecto al grid-container y al scroll down
  gridContainer.style.opacity = opacity
  scollDwn.style.opacity = opacity
})
