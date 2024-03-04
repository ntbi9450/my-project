import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import Sort from './components/sort'; // Corrected import
import Search from './components/search'; // Corrected import
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20); // Change this according to your preference
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data); // Initialize filteredData with all data when data changes
    setOriginalData(data); // Set original data when data changes
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/customers'); // Fetch data from your server
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset filtered data to original data
  const resetData = () => {
    setFilteredData(originalData);
    setCurrentPage(1); // Reset pagination to first page
  };

  return (
    <div className='body'>
      <h1>Customer Table</h1>
      <div className='searchsort'>
      
        <Search data={data} setData={setFilteredData} /> {/* Pass original data to Search */}
        <button className='b1'onClick={resetData}>Reset</button> {/* Reset button */}
        <Sort data={filteredData} setData={setFilteredData} originalData={originalData} /> {/* Pass original data to Sort */}
        
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <Table data={currentData} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / dataPerPage)}
            onPageChange={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default App;
