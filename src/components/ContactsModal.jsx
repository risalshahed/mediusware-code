import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataContext } from './Problem-2';
import { Form } from 'react-bootstrap';
import EachCountry from './EachCountry';
import { useNavigate } from 'react-router-dom';

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
  };

  const handleUSCountries = e => {
    e.preventDefault();
    navigate('/problem-2/us-contacts');
    setModalLabel('B');
    setButtonLabel('US Contacts');
    setTabIndex(2);
  };

  const handleClose = () => {
    setTimeout(() => {
      navigate('/problem-2');
    }, 0);
    setShow(false);
    setTabIndex(initialTabIndex);
    setIsChecked(false);
  };

  const handleShow = () => setShow(true);

  const filteredContacts = contacts?.filter(contact => {
    if (tabIndex === 1) {
      return (
        contact.country.name.toLowerCase().includes(query.toLowerCase()) ||
        contact.phone.includes(query)
      );
    } else if (tabIndex === 2) {
      return (
        contact.country.name === 'United States' &&
        (contact.country.name.toLowerCase().includes(query.toLowerCase()) ||
          contact.phone.includes(query))
      );
    }
    return false;
  });

  const handleOnlyEven = () => setIsChecked(!isChecked);

  const handleContactClick = contact => setSelectedContact(contact);

  return (
    <div>
      <button
        onClick={() => {
          if(onButtonClick) {
            onButtonClick();
          }
          handleShow();
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
          <Form.Group controlId="search">
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
            {filteredContacts?.map(contact => (
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
          <Button className='buttonA' onClick={handleAllCountries}>
            All Contacts
          </Button>
          
          <Button className='buttonB' onClick={handleUSCountries}>
            US Contacts
          </Button>

          <Button className='buttonA' onClick={handleClose}>
            Close
          </Button>

          <Form.Check
            type='switch'
            label='Only Even'
            checked={isChecked}
            onClick={handleOnlyEven}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactsModal;