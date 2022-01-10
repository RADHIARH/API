import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
const Userlist = () => {
   const [listOfUSer, setlistOfUSer] = useState([]);
   const[filter,setfilter]=useState([]);
   const[detail,setdetail]=useState([])
   const[show,setshow]= useState("");
   const[selected,setselected]=useState("");
    //  get data from API using axios and useEffect
   useEffect(() => {
     axios
       .get("https://jsonplaceholder.typicode.com/users")
       .then((res) => setlistOfUSer(res.data));
   }, []);
            console.log(listOfUSer)
            const showlist=()=>{
            setfilter(listOfUSer)
            setshow("")
   }
  //  functions
   const SearchUser=(name)=>{
       setshow("");
        const table=listOfUSer.filter(ele=>ele.name.toUpperCase().includes(name.toUpperCase()));
        setfilter(table); 
               
                            }
   const showDetails=(idd)=>{
        const t=listOfUSer.filter(el=>el.id===idd);
        setdetail(t);
        setshow("details")
   }
   const filteruser=()=>{
     setshow("filter");
     setselected("")
                         }
   const filtering=(value)=>{
      selected === "city"
        ? setfilter(listOfUSer.filter((element) =>
             element.address.city.toUpperCase().includes(value.toUpperCase())
           ))
         : setfilter( listOfUSer.filter((element) =>
             element.address.zipcode.includes(value)
           ));
   }
     return (
       <div className="user col-md-8 offset-md-2  mt-4  shadow users">
                {/* header */}
                <div className="d-flex header">
                    <button className="btn  m-4" onClick={() => showlist()}>
                      List Of Users
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="enter a name to search"
                      defaultValue=""
                      onChange={(event) => SearchUser(event.target.value)}
                    />
                    <button
                      className="btn m-4"
                      onClick={() => filteruser()}
                    >
                      Filter Users
                    </button>
                </div>
                <div className=" listuser  d-flex">
                  {/* listofusers */}
                    <div className="userl ">
                        {filter.map((element, key) => (
                        <div className=" row user bg-success m-4 ">
                            <div className="col-md-7 m-2">
                              <h6 className="text-white " key={key}>
                                {element.name}
                              </h6>
                            </div>
                            <div className="col show">
                              <button
                              className=" text-white btnshow  "
                              onClick={() => showDetails(element.id)}
                              style={{ width: "100px" }}
                              >
                            Details
                              </button>
                            </div>
                        </div>
                    ))}
                    </div>
                    {/* details & filter */}
                    <div className="detail  ">
                   {show === "details" ? (
                     detail.map((element, key) => (
                        <div className="card shadow  m-3">
                            <div className="card-header p-3 bg-success">
                               <h4 className='text-white'>{element.name}</h4>
                            </div>
                            <div className="card-body">
                               <ul className="list-group">
                                  <li className="list-group-item">
                                  <span>UserName :</span> {element.username}
                                  </li>
                                  <li className="list-group-item">
                                  <span>Email : </span>
                                  {element.email}
                                  </li>
                                  <li className="list-group-item">
                                    <span> Address :</span> {element.address.street}{" "}
                                    {element.address.suite} {element.address.city}{" "}
                                    {element.address.zipcode}
                                  </li>
                                  <li className="list-group-item">
                                    <span>Phone : </span>
                                    {element.phone}
                                  </li>
                                  <li className="list-group-item">
                                    <span>Company : </span>
                                    {element.company.name}
                                  </li>
                                  <li className="list-group-item">
                                    <span>Website : </span>
                                    {element.website}
                                  </li>
                                </ul>
                              </div>
                          </div>
                      ))) 
                   :show === "filter" ? (
                 <div>
                       <div className="card shadow border-0 mb-5">
                           <div className="card-body p-2">
                              <h2 className="h4 ">Choose Filter</h2>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(event) => setselected(event.target.value)}
                              >
                                <option selected>Choose Filter</option>
                                <option value="city">City</option>
                                <option value="zipcode">CodePostal</option>
                              </select>
                                      {selected !== "" ? (
                                        <input
                                          type="text"
                                          className="form-control"
                                          style={{ width: "250px", marginLeft: "20px" }}
                                          placeholder={selected}
                                          onChange={(event) => filtering(event.target.value)}
                                        />
                                      ) : null}
                              </div>
                         </div>
                  </div>
             ) : null}
                  </div>
                </div>
        </div>
     );
  
}
export default Userlist;


