import { useState } from "react";
import css from './ContactForm.module.css'

import PropTypes from 'prop-types';

export const ContactForm = ({onSubmit}) => {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "name") {
            return setName(value);
        }
        if (name === "number") {
            return setNumber(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({name, number});
        setName('');
        setNumber('');
    }

    return (
        <form className={css.contactForm} onSubmit={handleSubmit}>
            <label className={css.contactForm__field}> Name
                <input className={css.contactForm__input}
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onChange={handleChange}
                />
            </label>
            
            <label className={css.contactForm__field}> Number
                <input className={css.contactForm__input}
                    type="tel"
                    name="number"
                    value={number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onChange={handleChange}
                />
            </label>
            
            <button className={css.contactForm__btn}type="submit">Add contact</button>
        </form>
    ) 
}


ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}