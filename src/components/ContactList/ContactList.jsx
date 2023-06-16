import { useSelector, useDispatch } from 'react-redux';
import { contactSelector } from 'components/selectors';
import css from './ContactList.module.css';
import { delContact } from '../slice';

const ContactList = () => {
  const dispatch = useDispatch();
  const { contacts, filter } = useSelector(contactSelector);
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
    <ul>
      {getVisibleName().map(contact => {
        return (
          <li className={css.contactItem} key={contact.id}>
            {contact.name}: {contact.number}
            <button
              className={css.contactBtn}
              type="button"
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default ContactList;
