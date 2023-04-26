import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/form.css'

export function ContactForm() {
  const [form, setForm] = useState({
    agenda_slug: 'joseVerdugo-agenda',
    full_name: '',
    email: '',
    phone: '',
    address: '',
  })
  console.log(form)

  const updateContact = (e) => {
    e.preventDefault()
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(form),
      redirect: 'follow',
    }

    fetch('https://assets.breatheco.de/apis/fake/contact/', requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  return (
    <div className='Form'>
      <h1 className='Form-h1'>Add a new contact</h1>
      <form onSubmit={updateContact}>
        <div className='mb-3'>
          <label htmlFor='exampleInputName' className='form-label'>
            Full Name
          </label>
          <input
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            placeholder='Full Name'
            type='text'
            className='form-control'
            id='exampleInputName'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail' className='form-label'>
            Email
          </label>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder='Enter email'
            type='email'
            className='form-control'
            id='exampleInputEmail'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPhone' className='form-label'>
            Phone
          </label>
          <input
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder='Enter phone'
            type='number'
            className='form-control'
            id='exampleInputPhone'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputAddress' className='form-label'>
            Address
          </label>
          <input
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder='Enter address'
            type='text'
            className='form-control'
            id='exampleInputAddress'
          />
        </div>
        <button type='submit' className='Form-btn btn btn-primary mb-3'>
          Save
        </button>
      </form>
      <Link to='/'>or get back to contacts</Link>
    </div>
  )
}
