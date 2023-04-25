import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const ContactForm = () => {
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
    <>
      <form onSubmit={updateContact}>
        <div className='mb-3'>
          <label htmlFor='exampleInputName' className='form-label'>
            Full Name
          </label>
          <input
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
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
            type='text'
            className='form-control'
            id='exampleInputAddress'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <Link to='/'>or get back to contacts</Link>
    </>
  )
}
