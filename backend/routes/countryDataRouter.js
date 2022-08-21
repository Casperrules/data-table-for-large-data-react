import {countryData} from '../data/data.js';
import express from 'express';

const countryDataRouter = express.Router();

countryDataRouter.get('/countries',async (req,res)=>{
    res.send(countryData);
});

export default countryDataRouter;