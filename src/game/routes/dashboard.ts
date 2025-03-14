import express from "express";
import { sequelize } from "../utils/database.ts";

const { Dino, User } = sequelize.models

const route = express.Router();

route.get('/', async (req, res) => {
    const dinos = await Dino.findAll()
    const users = await User.findAll()
    res.render('dashboard/index', { dinos, users });
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