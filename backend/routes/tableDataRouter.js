import {data} from '../data/data.js';

import express from 'express';

const tableDataRouter = express.Router();

tableDataRouter.get('/dummyData',async (req,res)=>{
    res.send(data["data"]);
})

tableDataRouter.get('/dummyData/:page',async (req,res)=>{
    res.send({data:data['data'].slice((req.params.page-1)*10,req.params.page*10),totalCount:data["data"].length});
});

tableDataRouter.get('/dummyData/search/:page/:searchTerm', async (req,res)=>{
    let page = req.params.page;
    let search = req.params.searchTerm;
    let filteredData = data["data"].filter((item)=>item["FirstNameLastName"].toLowerCase().includes(search.toLowerCase()));
    res.send({data:filteredData.slice((page-1)*10,page*10),totalCount:filteredData.length});
});

tableDataRouter.get('/dummyData/sort/:page/:sortBy', async (req,res)=>{
    let page = req.params.page;
    let sortBy = req.params.sortBy;
    let sortedData = data["data"].sort((row1,row2)=>{
        let val1 = row1[sortBy];
        let val2 = row2[sortBy];
        if (/^\d+$/.test(val1)) {
            val1=parseInt(val1);
            val2 = parseInt(val2);
        }
        if (val1>val2) {
            return 1;
        }
        else if(val2>val1){
            return -1;
        }
        else{
            return 0;
        }
    });
    res.send({data:sortedData.slice((page-1)*10,page*10),totalCount:sortedData.length});
});

tableDataRouter.get('/dummyData/:page/:search/:sort',async (req,res)=>{
    let page = req.params.page;
    let search = req.params.search;
    let sort = req.params.sort;
    let filteredData = data["data"].filter((item)=>item["FirstNameLastName"].toLowerCase().includes(search.toLowerCase()));
    let sortedData = filteredData.sort((row1,row2)=>{
        let val1 = row1[sort];
        let val2 = row2[sort];
        if (/^\d+$/.test(val1)) {
            val1=parseInt(val1);
            val2 = parseInt(val2);
        }
        if (val1>val2) {
            return 1;
        }
        else if(val2>val1){
            return -1;
        }
        else{
            return 0;
        }
    });
    res.send({data:sortedData.slice((page-1)*10,page*10),totalCount:sortedData.length})
});


tableDataRouter.get('/lazyLoad/:skip/:take', async (req,res)=>{
    const skip = parseInt(req.params.skip);
    const take = parseInt(req.params.take);

    res.send(data["data"].slice(skip,skip+take));
});

tableDataRouter.get('/lazyLoad', async (req,res)=>{
    res.send(data["data"].slice(0,10));
});

export default tableDataRouter;