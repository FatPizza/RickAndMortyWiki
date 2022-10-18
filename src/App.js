import React, {useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap/";
import Cards from "./comps/cards/Cards";
import Filters from "./comps/filters/Filters";
import Pagination from './comps/pagination/Pagination';
import Search from './comps/search/Search';
import Navbar from './comps/Navbar/Navbar';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Episodes from './Pages/Episodes'
import Locations from './Pages/Locations'

function App () {
  return(
    <Router>
      <div className='App'><Navbar/></div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/episodes" element={<Episodes/>}/>
        <Route path="/locations" element={<Locations/>}/>
      </Routes>
      
    </Router>
  )
}

const Home = () =>{
  let [gender, setGender] = useState("");
  let [species, setSpecies] = useState("")
  let [status, setStatus] = useState("");
  let [pageNumber, setPageNumber] = useState(1);
  // console.log(pageNumber);
  let [search, setSearch] = useState("");
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;
  let [fetchedData, updateFetchData] = useState([]);
  let {info, results} = fetchedData
  

  useEffect(()=> {

    (async function(){

      let data = await fetch(api).then(res=>res.json())
      updateFetchData(data)

    })()


  }, [api])

  return (
    <div className="App">
      
      <Search setSearch={setSearch} setPageNumber={setPageNumber}/>
      <div className="container">
        <div className="row">
                <Filters
                setSpecies={setSpecies}
                 setStatus={setStatus} 
                setPageNumber={setPageNumber}
                setGender = {setGender} />
            <div className="col-8">
              <div className="row">
                  <Cards results={results}/>
              </div>
            </div>
        </div>
      </div>
        
      <Pagination info = {info} 
      pageNumber={pageNumber}
       setPageNumber={setPageNumber}/>
    </div>
  );
}

export default App;
