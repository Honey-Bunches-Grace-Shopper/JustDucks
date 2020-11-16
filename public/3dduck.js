import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js'
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js'
import {OBJLoader2} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/OBJLoader2.js'

function main() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({canvas})

  const fov = 45
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 10, 20)

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 5, 0)
  controls.update()

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('black')

  {
    const skyColor = 0xb1e1ff // light blue
    const groundColor = 0xb97a20 // brownish orange
    const intensity = 1
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 10, 0)
    light.target.position.set(-5, 0, 0)
    scene.add(light)
    scene.add(light.target)
  }

  {
    const objLoader = new OBJLoader2()
    objLoader.load('duck.obj', root => {
      scene.add(root)
    })
  }

  function render() {
    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
