import React from 'react'
import '../Table/Table.css'

function Table({sortSavedData}) {
  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1.</td>
          <td>{sortSavedData[0] && `${sortSavedData[0].name}`}</td>
          <td>{sortSavedData[0] && `${sortSavedData[0].result}`}</td>
        </tr>
        <tr>
          <td>2.</td>
          <td>{sortSavedData[1] && `${sortSavedData[1].name}`}</td>
          <td>{sortSavedData[1] && `${sortSavedData[1].result}`}</td> 
        </tr>
        <tr>
          <td>3.</td>
          <td>{sortSavedData[2] && `${sortSavedData[2].name}`}</td>
          <td>{sortSavedData[2] && `${sortSavedData[2].result}`}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default Table