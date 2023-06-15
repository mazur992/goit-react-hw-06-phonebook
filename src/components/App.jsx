import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Report } from 'notiflix';
import { contactSelector } from './selectors';
import { createContact, filterName, delContact } from './slice';

export function App() {
  const { contacts, filter } = useSelector(contactSelector);
  const dispatch = useDispatch();
  const handleNameChange = event => {
    const { value } = event.target;
    dispatch(filterName({ value }));
  };
  const handleBtnNameSubmit = (nameData, numberData) => {
    const isInclude = contacts.find(contact => contact.name === nameData);
    if (isInclude) {
      Report.info(nameData + ' Is already in contacts!');
      return;
    }
    dispatch(createContact({ nameData, numberData }));
  };
  const getVisibleName = () => {
    if (filter) {
      const normilizeFilter = filter.toLocaleLowerCase();

      return contacts.filter(contact =>
        contact.name.toLocaleLowerCase().includes(normilizeFilter)
      );
    }
    return contacts;
  };
  const deleteContact = contactId => {
    dispatch(delContact({ contactId }));
  };
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
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}
