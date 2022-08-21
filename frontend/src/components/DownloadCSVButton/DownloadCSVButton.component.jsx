import React,{useState} from 'react'


export default function DownloadCSVButton() {
    const [disable,setDisable] = useState(false);
    const headers = [
        {
            label:"Id",
            key:"ID"
        },
        {
            label:"Job Title",
            key:"JobTitle"
        },
        {
            label:"Email Agress",
            key:"EmailAddress"
        },
        {
            label:"Name",
            key:"FirstNameLastName"
        },
        {
            label:"age",
            key:"age"
        }
    ];
    
    const downloadCSVHandler = async ()=>{
        setDisable(true);
        fetch(`http://localhost:5500/data/table-data/dummyData/`)
        .then(response=> response.json())
        .then(data=>{
            console.log(data);
            const headers = Object.keys(data[0]);
            let csvDataList = [];
            csvDataList.push(headers.join(','));
            for(let row of data){
                csvDataList.push(Object.values(row).join(','))
            }
            const csvData = csvDataList.join('\r\n');
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.setAttribute('href', url)
            a.setAttribute('download', 'dataDownloaded.csv');
            a.click()
            setDisable(false);
        });
    }
  return (
    <button style={{width:"20%",margin:"1rem"}} disabled={disable} onClick={downloadCSVHandler}>Export CSV</button>
  )
}
