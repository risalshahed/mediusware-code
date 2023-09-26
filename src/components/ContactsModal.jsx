import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from './Problem-2';
import { Form } from 'react-bootstrap';
import EachCountry from './EachCountry';
import { Link, useNavigate } from 'react-router-dom';

const ContactsModal = ({ initialModalLabel, initialButtonLabel, buttonColor, initialTabIndex, onButtonClick }) => {
  const contacts = useContext(DataContext);
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(initialTabIndex);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalLabel, setModalLabel] = useState(initialModalLabel);
  const [buttonLabel, setButtonLabel] = useState(initialButtonLabel);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleAllCountries = e => {
    e.preventDefault();
    navigate('/problem-2/all-contacts');
    setModalLabel('A');
    setButtonLabel('All Contacts');
    setTabIndex(1);
  }

  const handleUSCountries = e => {
    e.preventDefault();
    navigate('/problem-2/us-contacts');
    setModalLabel('B');
    setButtonLabel('US Contacts');
    setTabIndex(2);
  }


  const handleClose = () => {
    // navigate('/problem-2');
    // ****** to ensure the navigate function executes after the modal is fully closed
    setTimeout(() => {
      navigate('/problem-2');
    }, 0);
    setShow(false);
    setTabIndex(initialTabIndex);
    setIsChecked(false);
  }

  const handleShow = () => setShow(true);

  console.log(contacts[0].country)

  // Filter contacts based on the tabIndex
  const filteredContacts = contacts.filter(contact => {
    // contact.country.name.toLowerCase().includes(query.toLowerCase());
    // console.log(contact[0]);
    if (tabIndex === 1) {
      // return true;
      return (
        // Filter by country name or phone number
        contact.country.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.phone.includes(query)
      );
    } else if (tabIndex === 2) {
      // return contact.country.name === 'United States'; // Show US contacts
      return (
        // Filter US contacts by country name or phone number
        contact.country.name === 'United States' &&
        (contact.country.name.toLowerCase().includes(query.toLowerCase()) ||
          contact.phone.includes(query))
      );
    }
    return false;
  });

  const handleChange = e => {
    // console.log(e.target.checked);  // output is true/false if checked/unchecked
    setIsChecked(e.target.checked);
  }

  const handleContactClick = contact => {
    setSelectedContact(contact);
  }

  return (
    <div>
      <button
        // onClick={handleShow}
        onClick={() => {
          if (onButtonClick) {
            onButtonClick(); // Call the onButtonClick prop
          }
          handleShow(); // Show the modal
        }}
        className={`btn btn-lg btn-outline-${buttonColor}`}
        type="button"
      >
        {buttonLabel}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`Modal ${modalLabel} for ${buttonLabel}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Search input */}
          <Form.Group controlId="search">
            {/* <Form.Label>Search:</Form.Label> */}
            <Form.Control
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search here"
            />
          </Form.Group>

          <ul className='contacts'>
            <li>
              <h4>Country</h4>
              <h4>Phone</h4>
            </li>
            {filteredContacts.map(contact => (
              isChecked
              ?
              (
                contact.id % 2 === 0
                &&
                <li key={contact.id} onClick={() => handleContactClick(contact)}>
                  <div>{contact.country.name}</div>
                  <div>{contact.phone}</div>
                </li>
              )
              :
              (
                <li key={contact.id} onClick={() => handleContactClick(contact)}>
                  <div>{contact.country.name}</div>
                  <div>{contact.phone}</div>
                </li>
              )
            ))}
          </ul>

          <EachCountry
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />
        </Modal.Body>

        <Modal.Footer>
          {/* <Link to="/problem-2/all-contacts"> */}
          <Button className='buttonA' onClick={handleAllCountries}>
            All Contacts
          </Button>
          {/* </Link> */}

          {/* <Link to="/problem-2/us-contacts"> */}
          <Button className='buttonB' onClick={handleUSCountries}>
            US Contacts
          </Button>
          {/* </Link> */}

          <Button className='buttonA' onClick={handleClose}>
            Close
          </Button>

          <Form.Check
            type='switch'
            label='Only Even'
            onChange={handleChange}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactsModal;