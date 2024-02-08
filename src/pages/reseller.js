import React, { useState, useEffect } from "react";
import { graphql, navigate, Link } from "gatsby";
import Img from "gatsby-image";
import { useIdentityContext } from "react-netlify-identity-widget";
import { isBrowser } from "../utils/general";
import FormInputField from '../components/FormInputField/FormInputField';
import Button from '../components/Button';
import Layout from "../components/layout";
import SEO from "../components/seo";
import NotificationBanner from '../components/NotificationBanner';

// results automagically passed to page component as 'data'
export const query = graphql`
  query {
    nurseryHero:file(name: { eq: "rows_low_contrast" }) {
        childImageSharp {
          fixed(width:800) {
            ...GatsbyImageSharpFixed
          }
        }
      }
  }
`

const ResllerPage = ({data}) => {
  const identity = useIdentityContext();
  const roles = (identity && identity?.user?.app_metadata?.roles);
  //console.log("user roles:",roles);
  const isWholesaleCustomer = roles?.includes('nursery');//used to restrict "trades people" and others from seeing the wholesale prices
  const isTradesCustomer = roles?.includes('trades');
  const hasNoRoll = !roles?.length;
  const isLoggedIn = identity && identity.isLoggedIn;
  //console.log("hasNoRoll:",hasNoRoll)

  const initialState = {
    name: '',
    email: '',
    plants: ''
  };

  const [orderForm, setOrderForm] = useState(initialState);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showBanner, setShowBanner] = useState();

  // update disable state of submit button. assumes all fields required.
  useEffect(()=> {
    if(orderForm && Object.values(orderForm).includes('')) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  },[orderForm]);

  const handleChange = (id, e) => {
    const tempForm = { ...orderForm, [id]: e };
    setOrderForm(tempForm);
  };

  const handleshowBanner = () => {
    setShowBanner(true);
    setOrderForm(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.assign({"form-name": "order"}, orderForm);
    const encodedFormData = new URLSearchParams(formData).toString();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedFormData
    })
    .then(handleshowBanner)
    .catch(error => alert(error));
  };

  if(isBrowser && identity && !isLoggedIn) { // redirect client when not logged in.
    navigate('/');
    return null;
  } else {
    return (
      <>
      <Layout pageName="reseller">
        <SEO title="Brough Plants Reseller Resources" />
        <h2>Reseller Resources</h2>

        {isWholesaleCustomer &&
          (
            <>
              <p>
                Welcome! We offer wholesale pricing on all plants to licensed nurseries with a CA sellers permit.
                If you have not already be sure to fill out and submit the CA reseller form below.
              </p>
              <p>
                <a href="/pdf/availability_wholesale_pricing.pdf" download target="_blank">Latest Plant Availability List with Wholesale Pricing</a>
              </p>
              <p>
                <a href="/pdf/CA_Resellers_Form.pdf" download target="_blank">CA Reseller Form </a>
              </p>
            </>
          )
        }
        {isTradesCustomer && !isWholesaleCustomer &&
          (
            <>
              <p>Welcome! We offer a 15% trade discount on all plants to landscape professionals.</p>
              <p>
                <a href="/pdf/availability_trade_pricing.pdf" download target="_blank">Latest Plant Availability List with Trade Pricing</a>
              </p>
            </>
          )
        }
        <p>
          <Link to="/delivery" >Delivery and Pickup Information</Link>
        </p>

            <h2>Order</h2>
            <p>List the plants, their sizes and quanties in the order and we will send an invoice for you to verify.</p>
            <form
                onSubmit={(e) => handleSubmit(e)}
                name="order"
                data-netlify="true"
              >
              <input type="hidden" name="form-name" value="order" />
              <div >
                  <FormInputField
                    id={'name'}
                    value={orderForm.name}
                    handleChange={(id, e) => handleChange(id, e)}
                    type={'text'}
                    labelName={'Contact Name'}
                    required
                  />
                  <FormInputField
                    id={'email'}
                    value={orderForm.email}
                    handleChange={(id, e) => handleChange(id, e)}
                    type={'email'}
                    labelName={'Email'}
                    required
                  />
                  <div >
                    <FormInputField
                      id={'plants'}
                      value={orderForm.plants}
                      handleChange={(id, e) => handleChange(id, e)}
                      type={'textarea'}
                      labelName={'Plants'}
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
            
        {hasNoRoll &&
          (
            <p>
              Thanks for signing up to purchase plants! We will reach out to you soon to request more information about your business.
              You can also tell us about your business by using our <a href="/apply">application form</a>.
              Check back here once we've approved your application for access to our pricing list.
            </p>
          )
        }


        <Img
            fixed={data.nurseryHero.childImageSharp.fixed}
            alt="Greenhouse Bulbils"
            className="aloe-regions-map"
          />

      </Layout>
      { showBanner &&
        <NotificationBanner
          msg="Thank you for your order request! We will reply as soon as possible."
        />
      }
    </>
    )
  }
}


export default ResllerPage
