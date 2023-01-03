import React, { useState, useEffect } from "react";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    nurseryHero:file(name: { eq: "agave-red-margin-landscape" }) {
        childImageSharp {
          fixed(width:800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
  }
`

const ContactPage = ({data}) => {

  const initialState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const [contactForm, setContactForm] = useState(initialState);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  // update disable state of submit button. assumes all fields required. 
  useEffect(()=> {
    if(contactForm && Object.values(contactForm).includes('')) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  },[contactForm]);

  const handleChange = (id, e) => {
    const tempForm = { ...contactForm, [id]: e };
    setContactForm(tempForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.assign({"form-name": "contact"}, contactForm);
    const encodedFormData = new URLSearchParams(formData).toString();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedFormData
    })
    .then(() => navigate("/"))
    .catch(error => alert(error));
  };

  return (
    <Layout pageName="contact">
      <SEO title="Contact" />
      <h2>Contact Us</h2>
      <p>
        Got a question? Write us an email or just use the form below.
      </p>
      <p>
        If you don't have an account yet and would like to buy plants fill out our <Link to="/apply">application form</Link> first.
      </p>
      <p>
        <span><b>Email</b> hans@broughplants.com</span>
      </p>
      <p>
        <span><b>CA Nursery License</b> C3194</span>
      </p>

      <form
          onSubmit={(e) => handleSubmit(e)}
          name="contact"
          data-netlify="true"
        >
        <input type="hidden" name="form-name" value="contact" />
        <div >
            <FormInputField
              id={'name'}
              value={contactForm.name}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'Contact Name'}
              required
            />
            <FormInputField
              id={'email'}
              value={contactForm.email}
              handleChange={(id, e) => handleChange(id, e)}
              type={'email'}
              labelName={'Email'}
              required
            />
            <FormInputField
              id={'subject'}
              value={contactForm.subject}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'Subject'}
              required
            />
            <div >
              <FormInputField
                id={'message'}
                value={contactForm.message}
                handleChange={(id, e) => handleChange(id, e)}
                type={'textarea'}
                labelName={'Message'}
                required
              />
            </div>

          </div>
          <Button
            disabled={submitDisabled}
            level={'primary'}
            type={'buttonSubmit'}
          >
            submit
          </Button>
      </form>

      <Img
          fixed={data.nurseryHero.childImageSharp.fixed}
          alt="Plants growing in all day sun."
          className="aloe-regions-map"
        />
    </Layout>
  )
}


export default ContactPage
