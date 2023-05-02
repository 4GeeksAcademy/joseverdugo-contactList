import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import '../../styles/form.css'
import { FaIdCard } from 'react-icons/fa'

export function ContactForm() {
  const { id } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const [form, setForm] = useState({
    agenda_slug: 'joseVerdugo-agenda',
    full_name: '',
    email: '',
    phone: '',
    address: '',
  })
  console.log(form)

  useEffect(() => {
    if (id) {
      fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener contacto')
          }
          return response.json()
        })
        .then((data) => {
          setForm({
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
          })
          setIsEditing(true)
        })
        .catch((error) => console.error(error))
    }
  }, [id])

  const updateContact = (e) => {
    e.preventDefault()

    // Si hay ID modifico los datos

    if (isEditing) {
      var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(form),
        redirect: 'follow',
      }

      fetch(
        `https://assets.breatheco.de/apis/fake/contact/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setShowAlert(true)
          console.log(result, 'modo editar')
        })
    } else {
      // Si no añado un nuevo contacto

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
        .then((result) => {
          setShowAlert(true)
          console.log(result, 'modo añadir')
        })
        .catch((error) => console.log('error', error))
    }
  }

  return (
    <div className='Form'>
      <h1 className='Form-h1'>
        {isEditing ? 'Edit Contact' : 'Add a new contact'}
      </h1>
      <form onSubmit={updateContact}>
        <div className='mb-3'>
          <label htmlFor='exampleInputName' className='form-label'>
            Full Name
          </label>
          <input
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            value={form.full_name}
            placeholder='Full Name'
            required
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
            value={form.email}
            placeholder='Enter email'
            required
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
            value={form.phone}
            placeholder='Enter phone'
            required
            type='text'
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
            value={form.address}
            placeholder='Enter address'
            required
            type='text'
            className='form-control'
            id='exampleInputAddress'
          />
        </div>
        <button type='submit' className='Form-btn btn btn-primary mb-3'>
          Save
        </button>
        {showAlert && (
          <div className='alert alert-success' role='alert'>
            Contact saved successfully!
          </div>
        )}
      </form>
      <Link to='/'>or get back to contacts</Link>
    </div>
  )
}
