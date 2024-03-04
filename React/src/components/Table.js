import React from 'react';

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className='th1'>S_NO</th>
            <th className='th1'>Customer_Name</th>
            <th className='th1'>Age</th>
            <th className='th1'>Phone</th>
            <th className='th1'>location</th>
            <th className='th1' colSpan="2">Created_At</th> {/* Using colSpan to merge two cells */}
          </tr>
          <tr> {/* Second row for subheadings */}
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th className='th1'>Date</th> {/* Subheading for Date */}
            <th className='th1'>Time</th> {/* Subheading for Time */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.sno}</td>
              <td>{row.customer_name}</td>
              <td>{row.age}</td>
              <td>{row.phone}</td>
              <td>{row.location}</td>
              {/* Split created_at into date and time */}
              <td>{row.created_at ? new Date(row.created_at).toLocaleDateString() : ''}</td>
              <td>{row.created_at ? new Date(row.created_at).toLocaleTimeString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
