import PropTypes from 'prop-types';
import css from './ContactList.module.css';
const ContactList = ({ getVisibleName, deleteContact }) => {
  const visibleName = getVisibleName();
  return (
    <ul>
      {visibleName.map(contact => {
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

ContactList.propTypes = {
  getVisibleName: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
