import { List, Delete } from './ContactList.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'Redux/Store';

export const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);

  const filtered = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <List>
      {filtered.map(({ name, number, id }) => (
        <li key={id}>
          {name}: {number}
          <Delete
            type="button"
            id={id}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </Delete>
        </li>
      ))}
    </List>
  );
};
