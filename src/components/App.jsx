import { useState, useEffect } from "react";
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App = () => {

  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem("contacts"));
    return value ?? [];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (contact) => {
    if (isDublicate(contact)) {
      return alert(`${contact.name} is already in contacts.`);
    }

    setContacts((prev) => {
      const newContact = {
        id: nanoid(),
        ...contact
      }
      return [...prev, newContact]
    })
  }

  const removeContact = (id) => {
    setContacts((prev) => {
      const newContacts = prev.filter((contact) => contact.id !== id);
      return newContacts;
    })
  }

  const handleChange = (e) => {
    const {value} = e.target;
    setFilter(value);
  }

  function isDublicate({ name }) {
    const result = contacts.find((contact) => contact.name === name);
    return result;
  }

  const getFilteredContacts = () => {

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();
      return normalizedName.includes(normalizedFilter);
    })  
    return filteredContacts;
  }
  
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={handleChange} />
        <ContactList items={getFilteredContacts()} onRemoveContact={removeContact} />
      </div>
    );
}