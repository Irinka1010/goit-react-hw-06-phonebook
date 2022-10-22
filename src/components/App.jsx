import Phonebook from 'components/Phonebook/Phonebook';
import css from './App.module.css';

export const App = () => {
  return (
    <div className={css.section}>
      <Phonebook />
    </div>
  );
};
