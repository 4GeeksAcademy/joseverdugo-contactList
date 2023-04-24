import React, { useState, useEffect } from "react";
import "../../styles/home.css";
import { FaPhone } from "react-icons/fa";
import { BsFillGeoAltFill, BsFillEnvelopeFill, BsPencilFill, BsTrash3Fill } from "react-icons/bs";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const getUrl =
    "https://assets.breatheco.de/apis/fake/contact/agenda/joseVerdugo-agenda";

  const getAllContacts = async () => {
    const res = await fetch(getUrl);
    const data = await res.json();
    console.log(data);
    setContacts(data);
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="Wrapper">
      <h1>Contact-list</h1>
      {contacts.map((contact) => (
        <div className="Contact" key={contact.id}>
          <div className="Contact-left">
			<img className="Contact-img" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
		  <div className="Contact-info">
			<h2>{contact.name}</h2>
			<ul className="Contact-ul">
				<li className="Contact-li">
					<span className="Contact-svg"><BsFillGeoAltFill/></span>
					<span className="Contact-address">{contact.address}</span>
				</li>
				<li className="Contact-li">
					<span className="Contact-svg"><FaPhone/></span>
					<span className="Contact-phone">{contact.phone}</span>
				</li>
				<li className="Contact-li">
					<span className="Contact-svg"><BsFillEnvelopeFill/></span>
					<span className="Contact-email">{contact.email}</span>
				</li>
			</ul>
		  </div>
		  </div>
		  <div className="Contact-rigth">
			<span className="Contact-change"><BsPencilFill/></span>
			<span className="Contact-change"><BsTrash3Fill/></span>
		  </div>
        </div>
      ))}
    </div>
  );
};
