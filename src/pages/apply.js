import React, { useState } from "react";
import { graphql, navigate } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown/Dropdown';
import SEO from "../components/seo";

import * as styles from './Apply.module.css';

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

const ApplyPage = ({data}) => {
  const initialState = {
    name: '',
    biz_name: '',
    phone: '',
    email: '',
    address: '',
    plants: '',
    profession: ''
  };

  const [applyForm, setApplyForm] = useState(initialState);

  const handleChange = (id, e) => {
    const tempForm = { ...applyForm, [id]: e };
    setApplyForm(tempForm);
  };

  const handleSubmit = (e) => {
    console.log("ApplyPage handleSubmit")
    e.preventDefault();
    const formData = Object.assign({"form-name": "apply"}, applyForm);
    const encodedFormData = new URLSearchParams(formData).toString();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedFormData
    })
    .then(() => navigate("/"))
    .catch(error => alert(error));
  };

  console.log("ApplyPage applyForm:",applyForm)
  return (
    <Layout>
      <SEO title="Apply" />
      <h1>Apply</h1>
      <p>
        Sourcing plants for a landscape project can be difficult.
        If you are a contractor, designer, architect or other landscape professional we can help you locate plant materials either with stock on hand or by coordinating with another wholesaler.
      </p>
      <p>To apply please use the form below to describe your business and project needs.</p>

      <form
          onSubmit={(e) => handleSubmit(e)}
          name="contact"
          data-netlify="true"
        >
        <input type="hidden" name="form-name" value="apply" />
        <div className={styles.applyForm}>
            <FormInputField
              id={'name'}
              value={applyForm.name}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'Contact Name'}
              required
            />
            <FormInputField
              id={'biz_name'}
              value={applyForm.biz_name}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'Business Name'}
              required
            />
            <FormInputField
              id={'phone'}
              value={applyForm.phone}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'Phone Number'}
              required
            />
            <FormInputField
              id={'email'}
              value={applyForm.email}
              handleChange={(id, e) => handleChange(id, e)}
              type={'email'}
              labelName={'Email'}
              required
            />
            <FormInputField
              id={'address'}
              value={applyForm.address}
              handleChange={(id, e) => handleChange(id, e)}
              type={'text'}
              labelName={'Business Address'}
              required
            />
            <div className={styles.commentInput}>
              <FormInputField
                id={'plants'}
                value={applyForm.description}
                handleChange={(id, e) => handleChange(id, e)}
                type={'textarea'}
                labelName={'Plants Needed'}
                required
              />
            </div>
            <div className={styles.budgetRange}>
              <Dropdown
                id={'profession'}
                handleChange={(id, e) => handleChange(id, e)}
                label="Profession"
                optionList = {[
                  {label:"Landscape Contractor", value:"contractor"},
                  {label:"General Contractor", value:"general"},
                  {label:"Garden Designer", value:"designer"},
                  {label:"Landscape Architect", value:"architect"},
                  {label:"Landscape Maintenance", value:"maintenance"},
                  {label:"Other", value:"other"}
                ]}
                required
              >
              </Dropdown>
            </div>
          </div>
          <Button
            className={styles.customButton}
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


export default ApplyPage
