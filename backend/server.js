import express from 'express';
import countryDataRouter from './routes/countryDataRouter.js';
import tableDataRouter from './routes/tableDataRouter.js';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/data/countryData',countryDataRouter);
app.use('/data/table-data',tableDataRouter)
app.listen(5500,()=>{
    console.log("running server on 5500");
});