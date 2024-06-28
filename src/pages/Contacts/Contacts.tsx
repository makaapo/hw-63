import React from 'react';

const Contacts = () => {
  return (
    <div className="d-flex flex-column mt-5">
      <h3 className="text-center">Contacts:</h3>
      <p className="text-center  mt-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi harum minima neque saepe sed sint sit. A
        incidunt unde voluptatibus!
      </p>
      <p className="fw-bold">
        <i className="bi bi-telephone-fill">&#x20;</i>
        Contacts:
      </p>
      <p>
        <i className="bi bi-phone">&#x20;</i>
        <a href="tel:+996700096046"
           className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">+996700096046</a>
      </p>
      <p>
        <i className="bi bi-envelope">&#x20;</i>
        <a href="mailto:akarimov@mega.kg"
           className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">akarimov@mega.kg</a>
      </p>
    </div>
  );
};

export default Contacts;