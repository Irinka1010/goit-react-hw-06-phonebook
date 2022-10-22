import { nanoid } from 'nanoid';
import css from 'components/ContactForm/ContactForm.module.css';
import { useState } from 'react';

const initialState = {
  name: '',
  number: '',
};

export default function ContactForm({ onSubmit }) {
  const [state, setState] = useState({ initialState });
  const nameId = nanoid();
  const numberId = nanoid();

  const handleChange = ev => {
    const { name, value } = ev.target;
    setState(prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handelSubmit = ev => {
    ev.preventDefault();
    const { name, number } = state;
    onSubmit({ name, number });
    setState(initialState);
  };
  const { name, number } = state;
  return (
    <form onSubmit={handelSubmit}>
      <label htmlFor={nameId}>Name</label>
      <input
        id={nameId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <label htmlFor={numberId}>Number</label>
      <input
        id={numberId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
