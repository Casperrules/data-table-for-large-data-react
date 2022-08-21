import React, { useEffect } from 'react'
import { useState } from 'react';
import LazyLoadTable from '../../components/table.component/LazyLoadTable.component/LazyLoadTable.component.jsx';
import PagenatedTable from '../../components/table.component/PagenatedTable/PagenatedTable.component.jsx';
import { ExportJsonCsv } from 'react-export-json-csv';

import './home.screen.css';
import DownloadCSVButton from '../../components/DownloadCSVButton/DownloadCSVButton.component';

export default function HomeScreen() {
    
    const [activeTab,setActiveTab] = useState('tab1');
    const tab1ClickHandler = ()=>{
        setActiveTab("tab1");
    }
    const tab2ClickHandler = ()=>{
        setActiveTab("tab2");
    }
   
    
    let table;
    if (activeTab=="tab1") {
        table = <PagenatedTable/>
    }
    else{
        table = <LazyLoadTable/>
    }
  return (
    <>
        
        <div className='tabs'>
            <div className={'tab1'+(activeTab=="tab1"?' active':'')} onClick={tab1ClickHandler}>
                Paginated Table
            </div>
            <div className={'tab2'+(activeTab=="tab2"?' active':'')} onClick={tab2ClickHandler}>
                LazyLoading Table
            </div>
        </div>
        <DownloadCSVButton />
        <div className='table-container'>
            {table}
        </div>
    </>
    
  )
}
