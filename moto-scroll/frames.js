// Fotogramas de la moto (cargados desde images.js como window.IMAGES)
const images = window.IMAGES || []
const MAX_FRAMES = images.length

const main = document.querySelector('main')
const gridContainer = document.getElementById('grid-container')
const scrollDwn = document.getElementById('scroll-dwn')

// Líneas decorativas
document.querySelectorAll('.line').forEach((line, index) => {
  const numLines = index === 0 ? 8 : 4
  for (let i = 0; i < numLines; i++) {
    const el = document.createElement('div')
    el.classList.add('under-line')
    if (i === numLines - 1) el.classList.add('last-line')
    line.appendChild(el)
  }
})

// Imagen de la moto
const img = document.createElement('img')
img.id = 'motorcycle'
img.alt = 'Motocicleta'
main.appendChild(img)

let currentFrame = -1
let maxScroll = 1
let ticking = false

function updateMaxScroll() {
  maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
}

function updateImage(frame) {
  if (!MAX_FRAMES) {
    console.error('No se encontraron imágenes en images.js')
    return
  }
  const safe = Math.max(0, Math.min(frame, MAX_FRAMES - 1))
  const src = images[safe] && images[safe].p
  if (!src) return
  img.src = src
  currentFrame = safe
}

function handleScroll() {
  const y = window.scrollY
  const fraction = Math.max(0, Math.min(1, y / maxScroll))
  const frame = Math.round(fraction * (MAX_FRAMES - 1))
  if (frame !== currentFrame) updateImage(frame)

  const opacity = 1 - Math.min(1, Math.max(0, y / 600))
  if (gridContainer) gridContainer.style.opacity = opacity
  if (scrollDwn) scrollDwn.style.opacity = opacity
}

updateMaxScroll()
updateImage(0)
handleScroll()

window.addEventListener('scroll', () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => { handleScroll(); ticking = false })
}, { passive: true })

window.addEventListener('resize', () => { updateMaxScroll(); handleScroll() })
window.addEventListener('load', updateMaxScroll)
