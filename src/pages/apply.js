import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import FormInputField from '../components/FormInputField/FormInputField';
import Icon from '../components/Icons/Icon';
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
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showBanner, setShowBanner] = useState();

  // update disable state of submit button. assumes last 2 fields NOT required.
  useEffect(() => {
    if(applyForm && Object.values(applyForm).slice(0, -2).includes('')) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  },[applyForm]);

  const handleChange = (id, e) => {
    const tempForm = { ...applyForm, [id]: e };
    setApplyForm(tempForm);
  };

  const handleshowBanner = () => {
    setShowBanner(true);
    setApplyForm(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.assign({"form-name": "apply"}, applyForm);
    const encodedFormData = new URLSearchParams(formData).toString();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedFormData
    })
    .then(handleshowBanner)
    .catch(error => alert(error));
  };

  return (
    <>
      <Layout pageName="apply">
        <SEO title="Apply" />
        <h2>Apply</h2>
        <p>
          Sourcing plants for a landscape project can be difficult.
          If you are a contractor, designer, architect or other landscape professional we can help you locate plant materials either with stock on hand or by coordinating with another wholesaler.
        </p>
        <p>
          To purchase plants at trade discount please use the form below to describe your business and project needs.
          Once we've reviewed your submission, we'll create your account and you'll receive an E-mail from us with instructions for setting a password.
        </p>
        <p>
          After successfully logging in you will have access to our Reseller area.
        </p>

        <form
            onSubmit={(e) => handleSubmit(e)}
            name="apply"
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
                  labelName={'Tell us about the types of plants you need'}
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
                    {label:"Wholesale Nursery", value:"wholesaler"},
                    {label:"Retail Nursery", value:"retail"},
                    {label:"Other", value:"other"}
                  ]}
                  required
                >
                </Dropdown>
              </div>
            </div>
            <Button
              className={styles.customButton}
              disabled={submitDisabled}
              level={'primary'}
              type={'buttonSubmit'}
            >
              submit
            </Button>
        </form>

        {/*<Img
            fixed={data.nurseryHero.childImageSharp.fixed}
            alt="Plants growing in all day sun."
            className="aloe-regions-map"
          />
          */}
      </Layout>
      {showBanner &&
        (
          <div className={styles.banner}>
            <div className={styles.closeContainer} onClick={() => setShowBanner(false)}>
              <Icon symbol={'cross'}></Icon>
            </div>
            <p>Thanks for submitting your details! We will review your submission within a few business days and send follow up instructions.</p>
          </div>
        )
      }
    </>
  )
}


export default ApplyPage
