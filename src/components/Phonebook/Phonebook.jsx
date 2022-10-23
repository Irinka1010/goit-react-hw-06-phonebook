import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import css from 'components/Phonebook/Phonebook.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getPhonebook, getFilter } from 'redux/selectors';
import { addContacts, removeContacts } from 'redux/contactsSlice';
import { setFilter } from 'redux/filterSlice';
export default function Phonebook() {
  const contacts = useSelector(getPhonebook);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const hendelChenge = ev => {
    const { value } = ev.target;
    dispatch(setFilter(value));
  };
  const isDuplicate = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };

  const onAddContacts = contact => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
    const action = addContacts(contact);
    dispatch(action);
  };
  const onRemoveContacts = id => {
    const action = removeContacts(id);
    dispatch(action);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);

      return result;
    });
    return filteredContacts;
  };

  const filterContacts = getFilteredContacts();
  return (
    <>
      <div className={css.formContact}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onSubmit={onAddContacts} />
      </div>
      <div className={css.contacts}>
        <h2 className={css.title}>Contacts</h2>
        <Filter onChange={hendelChenge} value={filter} />
        <ContactsList
          items={filterContacts}
          removeContacts={onRemoveContacts}
        />
      </div>
    </>
  );
}
