import express from "express";
import { sequelize } from "../utils/database.ts";

const { Dino, User } = sequelize.models

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

function getRandomNumber(min, max, isInteger = false) {
    const random = Math.random() * (max - min) + min;
    return isInteger ? Math.floor(random) : random;
}

const route = express.Router();

route.get('/', async (req, res) => {
    const scene = scenes[getRandomNumber(0, scenes.length, true)]
    const dinos = await Dino.findAll()
    const users = await User.findAll()
    res.render('dashboard/index', { dinos, users, scene });
})

route.post('/dino/save', async (req, res) => {
    try {
        const dino = Dino.build(req.body);
        await dino.save();
    } catch (error) {
        console.log(error.message)
        res.send('Failed to save dino')
        return;
    }
    res.redirect('/dashboard')
})

route.get('/dino/delete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const dino = await Dino.findByPk(id)
        if (dino) await dino.destroy();
    } catch (err) {
        console.log(err.message)
    }
    res.redirect('/dashboard')
})

route.post('/user/save', async (req, res) => {
    try {
        const user = User.build(req.body)
        await user.save();
    } catch (error) {
        console.log(error.message)
        res.send('Failed to save user')
        return;
    }
    res.redirect('/dashboard')
})

route.get('/database/sync', async (req, res) => {
    console.log('Sync Database...');
    try {
        await sequelize.sync({ alter: true });
        console.log('done');
        res.send({ error: false, message: 'Done' });
    } catch (err) {
        console.log('fail');
        res.send({ error: true, message: err.message });
    }
})

export default route;