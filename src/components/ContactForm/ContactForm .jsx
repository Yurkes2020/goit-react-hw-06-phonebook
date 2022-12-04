import { nanoid } from 'nanoid';
import { Form, FormLabel } from './ContactForm.styled';
import { addContact } from 'Redux/Store';
import { useDispatch, useSelector } from 'react-redux';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleSubmit = event => {
    const form = event.currentTarget.elements;
    event.preventDefault();
    contacts.find(
      contact => contact.name.toLowerCase() === form.name.value.toLowerCase()
    )
      ? alert(`${form.name.value} is already in contacts.`)
      : dispatch(
          addContact({
            id: nanoid(5),
            name: form.name.value,
            number: form.number.value,
          })
        );
    event.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>
        Name
        <input
          name="name"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>

      <FormLabel>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormLabel>

      <button type="submit">Add contact</button>
    </Form>
  );
};
