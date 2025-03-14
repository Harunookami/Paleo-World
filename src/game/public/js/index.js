const scenes = [
    [
        ['/images/game/grass3.svg', 'absolute top-[350px] right-[460px] w-[100px] scale-x-[-1]'],
        ['/images/game/dino8.svg', 'absolute top-[200px] right-[230px] w-[270px] scale-x-[-1]'],
        ['/images/game/grass3.svg', 'absolute top-[420px] right-[230px] w-[100px]'],
    ], [
        ['/images/game/bush3.svg', 'absolute top-[300px] right-[460px] w-[220px] scale-x-[-1]'],
        ['/images/game/dino5.svg', 'absolute top-[200px] right-[230px] w-[270px] scale-x-[-1]'],
        ['/images/game/bush3.svg', 'absolute top-[400px] right-[230px] w-[220px]'],
    ], [
        ['/images/game/grass1.svg', 'absolute top-[300px] right-[460px] w-[120px] scale-x-[-1]'],
        ['/images/game/dino4.svg', 'absolute top-[200px] right-[230px] w-[270px] scale-x-[-1]'],
        ['/images/game/grass1.svg', 'absolute top-[400px] right-[230px] w-[120px]'],
    ], [
        ['/images/game/grass1.svg', 'absolute top-[300px] right-[460px] w-[120px] scale-x-[-1]'],
        ['/images/game/dino3.svg', 'absolute top-[200px] right-[230px] w-[270px] scale-x-[-1]'],
        ['/images/game/grass1.svg', 'absolute top-[400px] right-[230px] w-[120px]'],
    ], [
        ['/images/game/grass3.svg', 'absolute top-[300px] right-[480px] w-[120px] scale-x-[-1]'],
        ['/images/game/dino2.svg', 'absolute top-[200px] right-[230px] w-[270px] scale-x-[-1]'],
        ['/images/game/grass3.svg', 'absolute top-[400px] right-[130px] w-[120px]'],
    ], [
        ['/images/game/cloud1.svg', 'absolute top-[300px] right-[480px] w-[180px] scale-x-[-1]'],
        ['/images/game/dino7.svg', 'absolute top-[200px] right-[230px] w-[270px] scale-x-[-1]'],
        ['/images/game/cloud1.svg', 'absolute top-[400px] right-[130px] w-[180px] scale-x-[-1]'],
    ], [
        ['/images/game/dino6.svg', 'absolute top-[200px] right-[230px] w-[270px] scale-x-[-1]'],
    ],
]

globalThis.addEventListener('DOMContentLoaded', () => {
    const scene = scenes[getRandomNumber(0, scenes.length, true)]
    applyScene(scene)
})

function applyScene(scene) {
    const elements = currentScene.querySelectorAll(':not(#scene_shape)')
    for (const el of elements) {
        el.remove()
    }
    for (const item of scene) {
        const img = document.createElement('img')
        img.src = item[0]
        img.classList.add(...item[1].split(' '))
        currentScene.appendChild(img)
    }
}

function getRandomNumber(min, max, isInteger = false) {
    const random = Math.random() * (max - min) + min;
    return isInteger ? Math.floor(random) : random;
}
