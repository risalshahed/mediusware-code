import { createContext, useEffect, useState } from 'react';
import AllCountries from './AllCountries';
import USCountries from './USCountries';
import './Problem-2.css';

export const DataContext = createContext();

const Problem2 = () => {

  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  
  
  useEffect(() => {  
    const fetchData = (async () => {
      // const allFetchedData = [];

      const res = await fetch(`https://contact.mediusware.com/api/contacts/?page=${page}`);
      const data = await res.json();
      // allFetchedData.push(...data.results);

      // set the contacts
      setContacts(prevContacts => [...prevContacts, ...data.results]);
    })();   // IIFE -> Immediately Invoked Function Execution
  }, [page]);

  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);



  /* useEffect(() => {
    const fetchData = (async () => {
      const allFetchedData = [];

      for(let i = 1; i <= 30; i++) {
        const res = await fetch(`https://contact.mediusware.com/api/contacts/?page=${i}`);
        const data = await res.json();
        allFetchedData.push(...data.results);
      }
      // set the contacts
      setContacts(allFetchedData);
    })();   // IIFE -> Immediately Invoked Function Execution

      // call fetchData function
      // fetchData();
  }, []) */

  // console.log(contacts);

  /* const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); */

  return (

    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

        <DataContext.Provider value={contacts}>
          <div className="d-flex justify-content-center gap-3">
            <AllCountries />
            <USCountries />
          </div>
        </DataContext.Provider>
      </div>


      {/* <div>
        {
          // console.log(contacts)
          contacts.map(contact =>
            <div key={contact.id}>
              {contact.country.name}
            </div>
          )
        }
      </div> */}
    </div>
  );
};

export default Problem2;