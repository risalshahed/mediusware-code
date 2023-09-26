import { Link } from 'react-router-dom';
import ContactsModal from './ContactsModal';

const USCountries = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Programmatically navigate to "problem-2/all-countries"
  //   navigate('/problem-2/us-countries');
  // }, [navigate]);

  return (
    <Link to='/problem-2/us-countries'>
      <ContactsModal initialModalLabel="B" initialButtonLabel="US Contacts" buttonColor="warning" initialTabIndex={2} />
    </Link>
  )
  
};

export default USCountries;



// import { useContext } from 'react';
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { DataContext } from './Problem-2';

// const USCountries = () => {
//   const contacts = useContext(DataContext)

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [tabIndex, setTabIndex] = useState(2);

//   let content;

//   if(tabIndex === 1) {
//     content = (
//       <ul>
//         {contacts.map(contact => (
//           <li key={contact.id}>
//             {contact.country.name}
//           </li>
//         ))}
//       </ul>
//     )
//   } else if (tabIndex === 2) {
//     content = (
//       <ul>
//         {contacts.map(contact => {
//           if(contact.country.name === 'United States') {
//             return contact.country.name
//           }
//         })}
//       </ul>
//     )
//   }

//   return (
//       <div>
//           <button
//             onClick={handleShow}
//             className="btn btn-lg btn-outline-warning"
//             type="button"
//           >
//             US Contacts
//           </button>

//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Modal B</Modal.Title>
//             </Modal.Header>

//             <Modal.Body>
//               {content}
//             </Modal.Body>

//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setTabIndex(1)}>
//                 All Contacts
//               </Button>
//               <Button variant="secondary"  onClick={() => setTabIndex(2)}>
//                 US Contacts
//               </Button>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//             </Modal.Footer>
//           </Modal>
//       </div>
//   );
// };

// export default USCountries;