import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('localContacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');
  const handleNameChange = event => {
    const { value } = event.target;
    setFilter(value);
  };
  const handleBtnNameSubmit = (nameData, numberData) => {
    const isInclude = contacts.find(contact => contact.name === nameData);

    if (isInclude) {
      Report.info(nameData + ' Is already in contacts!');
      return;
    }
    setContacts(prevState => [
      ...prevState,
      { name: nameData, id: nanoid(), number: numberData },
    ]);
  };
  const getVisibleName = () => {
    const normilizeFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normilizeFilter)
    );
  };
  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };
  useEffect(() => {
    localStorage.setItem('localContacts', JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className={css.appContainer}>
        <div>
          <h1 className={css.title}>Phonebook</h1>
          <ContactForm handleBtnNameSubmit={handleBtnNameSubmit} />
        </div>
        <div>
          <h2 className={css.subtitle}>Contacts</h2>
          <Filter value={filter} onChange={handleNameChange} />
          <ContactList
            getVisibleName={getVisibleName}
            deleteContact={deleteContact}
          />
        </div>
      </div>
    </div>
  );
}
