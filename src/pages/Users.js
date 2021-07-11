import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/config";
import { Link } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = firestore.collection("users");
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      <table id="table-to-xls" className="ui selectable celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Register No.</th>
            <th>Sem.</th>
            <th>c1s5</th>
            <th>c1s5i</th>
            <th>c2s5</th>
            <th>c2s5i</th>
            <th>c3s5</th>
            <th>c3s5i</th>
            <th>c4s5</th>
            <th>c4s5i</th>
            <th>c5s5</th>
            <th>c1s5i</th>
            <th>c6s5</th>
            <th>c6s5i</th>
            <th>c1s7</th>
            <th>c1s7i</th>
            <th>c2s7</th>
            <th>c2s7i</th>
            <th>c3s7</th>
            <th>c3s7i</th>
            <th>dt,tm</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td>
                <Link to={`/profile/${user.uid}`}>{user.name}</Link>
              </td>
              <td>{user.rn}</td>
              <td>{user.sem}</td>

              <td>{user.uit1501}</td>
              <td>{user.cifat}</td>

              <td>{user.uit1502}</td>
              <td>{user.cipos}</td>

              <td>{user.uit1503}</td>
              <td>{user.cicna}</td>

              <td>{user.uit1504}</td>
              <td>{user.cidsp}</td>

              <td>{user.uit1505}</td>
              <td>{user.ciai}</td>

              <td>{user.uit1522}</td>
              <td>{user.cidc}</td>

              <td>{user.uit1701}</td>
              <td>{user.ciccv}</td>

              <td>{user.uit1702}</td>
              <td>{user.cins}</td>

              <td>{user.uit1723}</td>
              <td>{user.cido}</td>

              <td>{user.ts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
