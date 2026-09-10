'use client'

import createGlobe from 'cobe'
import { MapPin, ShieldCheck } from 'lucide-react'
import { useEffect, useRef } from 'react'

type Rgb = [number, number, number]

const locations = {
  newYork: [40.7128, -74.006] as [number, number],
  london: [51.5074, -0.1278] as [number, number],
  capeTown: [-33.9249, 18.4241] as [number, number],
  singapore: [1.3521, 103.8198] as [number, number],
  tokyo: [35.6762, 139.6503] as [number, number]
}

function getPrimaryRgb(): Rgb {
  if (typeof window === 'undefined') return [0.31, 0.27, 0.9]

  const probe = document.createElement('span')
  probe.className = 'text-primary'
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  document.body.appendChild(probe)
  const color = getComputedStyle(probe).color
  probe.remove()

  const channels = color.match(/\d+(?:\.\d+)?/g)?.map(Number)
  if (!channels || channels.length < 3) return [0.31, 0.27, 0.9]

  return [channels[0] / 255, channels[1] / 255, channels[2] / 255]
}

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef({ phi: 0.15, theta: 0.25 })
  const dragRef = useRef({ active: false, x: 0, y: 0, phi: 0.15, theta: 0.25 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return
    const originalParent = container

    let size = Math.max(280, container.clientWidth || 480)
    let animationFrame = 0
    let isDestroyed = false
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      isDestroyed = true
      cancelAnimationFrame(animationFrame)
    }

    canvas.addEventListener('webglcontextlost', handleContextLost, false)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const primary = getPrimaryRgb()

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: rotationRef.current.phi,
      theta: rotationRef.current.theta,
      dark: 0,
      diffuse: 1.35,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.05,
      baseColor: [0.34, 0.37, 0.52],
      markerColor: primary,
      glowColor: [0.55, 0.58, 1],
      arcColor: primary,
      arcWidth: 0.65,
      arcHeight: 0.32,
      markerElevation: 0.04,
      markers: [
        { location: locations.newYork, size: 0.055 },
        { location: locations.london, size: 0.045 },
        { location: locations.capeTown, size: 0.04 },
        { location: locations.singapore, size: 0.05 },
        { location: locations.tokyo, size: 0.045 }
      ],
      arcs: [
        { from: locations.newYork, to: locations.london },
        { from: locations.london, to: locations.capeTown },
        { from: locations.capeTown, to: locations.singapore },
        { from: locations.singapore, to: locations.tokyo },
        { from: locations.tokyo, to: locations.newYork }
      ]
    })

    const render = () => {
      if (isDestroyed) return

      if (!dragRef.current.active && !prefersReducedMotion) {
        rotationRef.current.phi += 0.0022
      }

      globe.update({
        phi: rotationRef.current.phi,
        theta: rotationRef.current.theta,
        width: size * 2,
        height: size * 2
      })

      animationFrame = requestAnimationFrame(render)
    }

    animationFrame = requestAnimationFrame(render)

    const resizeObserver = new ResizeObserver(([entry]) => {
      size = Math.max(280, Math.floor(entry.contentRect.width))
    })

    resizeObserver.observe(container)

    return () => {
      isDestroyed = true
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      globe.destroy()

      // cobe reparents the canvas into an internal wrapper. Restore the
      // original DOM shape so React Strict Mode can initialize it again.
      const wrapper = canvas.parentElement
      if (wrapper && wrapper !== originalParent) {
        originalParent.append(canvas)
        wrapper.remove()
      }
    }
  }, [])

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      phi: rotationRef.current.phi,
      theta: rotationRef.current.theta
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.active) return

    const drag = dragRef.current
    rotationRef.current.phi = drag.phi + (event.clientX - drag.x) * 0.006
    rotationRef.current.theta = Math.max(-0.7, Math.min(0.7, drag.theta + (event.clientY - drag.y) * 0.004))
  }

  const stopDragging = () => {
    dragRef.current.active = false
  }

  return (
    <div className="relative mx-auto aspect-square w-full max-w-150 select-none">
      <div className="absolute inset-[12%] rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-[7%] rounded-full border border-primary/10" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        aria-label="Interactive globe showing worldwide crypto card coverage"
        className="relative z-10 h-full w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      />

      <div className="bg-card/90 absolute top-[12%] left-0 z-20 hidden items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-sm sm:flex">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MapPin className="size-3.5" aria-hidden="true" />
        </span>
        ETH network fees
      </div>

      <div className="bg-card/90 absolute right-0 bottom-[17%] z-20 hidden items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-sm sm:flex">
        <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="size-3.5" aria-hidden="true" />
        </span>
        Compare with confidence
      </div>
    </div>
  )
}
