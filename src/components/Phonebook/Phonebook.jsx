import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import css from 'components/Phonebook/Phonebook.module.css';
import { useState, useEffect } from 'react';

export default function Phonebook() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const velue = JSON.parse(localStorage.getItem('contacts'));
    return velue ?? [];
  });
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const hendelChenge = ev => {
    const { value } = ev.target;
    setFilter(value);
  };
  const isDuplicate = ({ name }) => {
    const result = contacts.find(item => item.name === name);
    return result;
  };

  const addContacts = contact => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prev => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return [...prev, newContact];
    });
  };
  const removeContacts = id => {
    setContacts(prev => {
      const newContacts = prev.filter(contact => contact.id !== id);
      return newContacts;
    });
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
        <ContactForm onSubmit={addContacts} />
      </div>
      <div className={css.contacts}>
        <h2 className={css.title}>Contacts</h2>
        <Filter onChange={hendelChenge} value={filter} />
        <ContactsList items={filterContacts} removeContacts={removeContacts} />
      </div>
    </>
  );
}
