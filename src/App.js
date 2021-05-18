import React, { useState, useEffect } from "react";

import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [dataList, setDataList] = useState([]);

  const onChangeInput = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const createData = (formData) => {
    axios({
      method: "post",
      url: "http://localhost:5000/exercises/add",
      headers: {},
      data: formData,
    });
   
  };
  const deleteDataByID = (id) => {
    axios.delete("http://localhost:5000/exercises/", {
      data: {
        id: id,
      },
    });
    setDataList((oldList) => {
      return oldList.filter((arr, i) => {
        return arr._id !== id;
      });
    });
  };
  
  const onClickSubmit = () => {
    setDataList([...dataList, formData]);
    createData(formData);
    setFormData({ name: "", email: "" });
  
  };
  const updateDataById = (id, name, email) => {
    axios({
      method: "post",
      url: "http://localhost:5000/exercises/update",
      data: { id: id, name: name, email: email },
    });
  };


  const onEdit = (key, name, email) => {
    dataList[key] = { name: name, email: email };
    console.log(dataList);
    setDataList(dataList);
  };

 
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("http://localhost:5000/exercises");
        setDataList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  return (
    <>
      <div className="container">
        <div className="addTodoContainer">
          <h3>
            Welcome!
          </h3>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            onChange={onChangeInput}
            value={formData.name}
          />
          <br />
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            onChange={onChangeInput}
            value={formData.email}
          />
          <br />
          <button onClick={onClickSubmit}>click me </button>
        </div>
      </div>
      <div className="container" style={{ padding: "20px", width: "51%" }}>
        <div className="addTodoContainer">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>done</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.map((row, index) => (
                  <TableRow key={row.index}>
                    <TableCell
                      onBlur={(e) => {
                        e.target.parentNode.children[0].setAttribute(
                          "contentEditable",
                          "false"
                        );
                        e.target.parentNode.children[1].setAttribute(
                          "contentEditable",
                          "false"
                        );
                      }}
                      onInput={(e) => {
                        let name = e.currentTarget.textContent;
                        let email =
                          e.currentTarget.parentNode.children[1].innerHTML;

                        onEdit(index, name, email);
                      }}
                      component="th"
                      scope="row"
                      contentEditable="false"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      contentEditable="false"
                      onBlur={(e) => {
                        e.target.parentNode.children[0].setAttribute(
                          "contentEditable",
                          "false"
                        );
                        e.target.parentNode.children[1].setAttribute(
                          "contentEditable",
                          "false"
                        );
                      }}
                      onInput={(e) => {
                        let email = e.currentTarget.textContent;
                        let name =
                          e.currentTarget.parentNode.children[0].innerHTML;

                        onEdit(index, name, email);
                      }}
                    >
                      {row.email}
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        onClick={(e) => {
                          if (e.target.tagName === "path") {
                            e.target.parentNode.parentNode.parentNode.children[0].setAttribute(
                              "contentEditable",
                              "true"
                            );
                            e.target.parentNode.parentNode.parentNode.children[1].setAttribute(
                              "contentEditable",
                              "true"
                            );
                          } else if (e.target.tagName === "svg") {
                            e.target.parentNode.parentNode.children[0].setAttribute(
                              "contentEditable",
                              "true"
                            );
                            e.target.parentNode.parentNode.children[1].setAttribute(
                              "contentEditable",
                              "true"
                            );
                          }
                        }}
                        style={{ color: "#6c5ce7" }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => {
                          deleteDataByID(row._id);
                        }}
                        style={{ color: "red" }}
                      />
                    </TableCell>
                    <TableCell>
                      <DoneOutlineIcon
                        onClick={(e) => {
                          console.log(e.target.tagName);
                          let name, email;

                          if (e.target.tagName === "path") {
                            console.log(
                              e.target.parentNode.parentNode.parentNode
                                .children[0].innerHTML
                            );
                            name =
                              e.target.parentNode.parentNode.parentNode
                                .children[0].innerHTML;
                            email =
                              e.target.parentNode.parentNode.parentNode
                                .children[1].innerHTML;
                            updateDataById(row._id, name, email);
                          } else if (e.target.tagName === "svg") {
                            console.log(
                              e.target.parentNode.parentNode.children[0]
                                .innerHTML
                            );
                            name =
                              e.target.parentNode.parentNode.children[0]
                                .innerHTML;
                            email =
                              e.target.parentNode.parentNode.children[1]
                                .innerHTML;
                            updateDataById(row._id, name, email);
                          }
                        }}
                        style={{ color: "green" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default App;
