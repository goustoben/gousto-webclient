import React from 'react'
import classnames from 'classnames'
import { Heading, LayoutPageWrapper } from 'goustouicomponents'
import Helmet from 'react-helmet'
import policy from 'config/policy'
import css from './PrivacyStatement.css'

const PrivacyStatement = () => (
  <LayoutPageWrapper>
    <Helmet
      title={policy.head.title}
      meta={policy.head.meta}
    />

    <section className={css.mainSection}>
      <Heading type="h1" size="fontStyle2XL" isCenter>Privacy Statement</Heading>
      <p>Effective Date: 01/03/2021 (Version 2.3)</p>
      <ol className={css.orderedList}>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type="h2">Who are we?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>
              We are SCA Investments Limited trading as &quot;Gousto&quot;. We own and operate this website/app. Please contact us if you have any questions or feedback about this Privacy Statement:&nbsp;
              <a href="https://www.gousto.co.uk/help" target="_blank" rel="noopener noreferrer">click here</a>
              .
            </li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type="h2" size="fontStyleM">What&apos;s the point of this Privacy Statement?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>This Privacy Statement tells you how we deal with your &quot;personal data&quot; (i.e. technical term for information about any identified or identifiable living person). Please read on to find out what kinds of personal data we collect, how we use and protect it, who we share it with, how long we keep it for and how you can access and rectify it.</li>
            <li className={css.itemList}>Please do not use our website or apps unless you are completely happy with this Privacy Statement.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type="h2" size="fontStyleM">Might the Privacy Statement change?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>It may well do. Whenever we have updated our Privacy Statement, we will alert you via email. Please take that opportunity to re-read it. We will assume you agree to the revised Privacy Statement if you use the website or apps after the effective date shown at the top of the Privacy Statement.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type="h2" size="fontStyleM">What personal or other data do we collect?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>
              We collect and store the information which you give us via forms on our website or apps - such as your name, address, email address, phone number(&quot;
              <strong>contact data</strong>
              &quot;) - or when communicating with us by email, or in some other way.
            </li>
            <li className={css.itemList}>
              We also collect and store certain information such as your IP address (&quot;
              <strong>customer behaviour data</strong>
              &quot;)
              to improve your shopping experience by suggesting suitable products for you, based on previous purchases, or recipes looked at.
            </li>
            <li className={css.itemList}>
              We collect your bank account and payment card details (
              <strong>payment information</strong>
              ) in order to process payments and refunds.
            </li>
            <li className={css.itemList}>
              We collect survey data (such as biannual survey, NPS, etc.) which can include household makeup (number or kids and age bracket), age (bracket not birthday), gender and  food preferences/allergies in order to understand how we are serving different types of customers and what we need to do to improve their experience.
            </li>
            <li className={css.itemList}>
              We also collect, use and share pixel/cookies data (including but not limited to HTTP headers, pixel-specific data, button click data, optional values and form field names) and, if already provided to us, contact data, in order to communicate with existing customers and prospective customers who have visited our website or apps but not yet signed up. See below the Privacy Statement for our Cookies Policy.
            </li>
            <li className={css.itemList}>
              We also collect the following categories of data:
              <ol className={css.orderedList}>
                <li className={css.itemList}>
                  &quot;
                  <strong>transaction data</strong>
                  &quot;
                  which may include your payment information and other details of products you have purchased from our website or apps;
                </li>
                <li className={css.itemList}>
                  &quot;
                  <strong>usage data</strong>
                  &quot;
                  which may include information about how you use our website or apps, and products; and
                </li>
                <li className={css.itemList}>
                  &quot;
                  <strong>marketing and communications data</strong>
                  &quot;
                  which may include your preferences in receiving marketing from us and our third parties and your communication preferences.
                </li>
              </ol>
            </li>
            <li className={css.itemList}>
              Under GDPR, we will use the lawful basis of &quot;contractual&quot;, where we use contact and payment data to fulfil orders. When we use contact, survey, or customer behaviour data for marketing reasons, the lawful basis will be &quot;consent&quot;, or &quot;legitimate interest&quot;. If you would like further information, please contact us using the details within this Privacy Statement.
            </li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type="h2" size="fontStyleM">How do we use your personal data?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>
              We use &quot;contact data&quot; to provide our services: e.g. send service messages or direct mail, communicate to you about your account/orders and to fulfil orders.
            </li>
            <li>
              We may, as part of your Gousto delivery (this being the primary purpose of processing your data under these circumstances), include gifts, free samples and other promotional material that we think may be of interest to you.

            </li>
            <li className={css.itemList}>
              If you have given permission, we may, solely for marketing purposes, use your &quot;
              contact data
              &quot; to send you marketing emails, mails, calls or SMS with details of our, or third party goods or services which may be of interest to you, including information about special offers or promotions.
            </li>
            <li className={css.itemList}>
              We use &quot;
              payment information
              &quot; to process payments and refunds.
            </li>
            <li className={css.itemList}>
              We may use your IP address and other customer behaviour data to recognise you when you visit, or return to our website or apps. This allows us to track anonymised traffic and usage patterns, prevent or detect fraud and help us improve our service. We may use cookies to do this. See below the Privacy Statement for our Cookies Policy.
            </li>
            <li className={css.itemList}>
              If you supply us with a friend&apos;s email address for the &quot;Refer A Friend&quot; programme, we will use that email address only to send a special offer to your friend. We will provide your name in the offer email to your friend, so that they know where we got their contact details from.
            </li>
            <li className={css.itemList}>We may use information we collect on you to recommend recipes to you and to improve our service for you and other customers.</li>
            <li className={css.itemList}>
              We will only retain your personal information for as long as is reasonably necessary in the circumstances and delete or anonymise personal data as soon as the purpose of storage no longer applies and legal retention periods do not preclude deletion. To determine the appropriate retention period for personal data, we consider the following factors:
              <ol className={css.orderedList}>
                <li className={css.itemList}>
                  the amount, nature, and sensitivity of the personal data;
                </li>
                <li className={css.itemList}>
                  the potential risk of harm from unauthorised use or disclosure of your personal data;
                </li>
                <li className={css.itemList}>
                  the purposes for which we process your personal data; and
                </li>
                <li className={css.itemList}>
                  whether we can achieve those purposes through other means, and the applicable legal requirements.
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type="h2" size="fontStyleM">How do we protect personal data?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>Security is a high priority for us. We take appropriate precautions to protect personal data. We will make every effort to look after your data and treat it with the respect it deserves.</li>
            <li className={css.itemList}>Your data will be transferred, stored and/or processed outside the EEA as our suppliers sometimes operate from outside of the EEA. We will only transfer your data outside of the EEA in compliance with data protection laws and provided appropriate or suitable safeguards are in place to protect your data such as Standard Contractual Clauses, Binding Corporate Rules (including the Mastercard Binding Corporate Rules) or any other clauses, mechanisms or safeguards to ensure compliance. Please contact us if you would like details of the appropriate safeguards.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type="h2" size="fontStyleM">To whom do we disclose personal data?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>
              We may allow access to your personal data by third parties who supply us with a service. Examples include e-commerce platform providers, couriers (to enable delivery of goods)(for example, please refer to the
              <a href="http://www.yodel.co.uk/general-privacy-notice" target="_blank" rel="noopener noreferrer"> Yodel Privacy Notice </a>
              and
              <a href="http://www.collectplus.co.uk/privacy-policy" target="_blank" rel="noopener noreferrer"> CollectPlus Privacy Policy</a>
              ), IT service providers (to host, manage and service our data), website hosts, content delivery networks and businesses which assist us in undertaking communications, monitoring, testing or improving our website.
            </li>
            <li className={css.itemList}>
              We may share your payment information (including your email address) with banks and payment service providers such as PayPal, SagePay, checkout.com and First Data (our payment gateway and providers) in order to process the payments of your orders and any potential refund.
            </li>
            <li className={css.itemList}>
              Your personal data may be supplied by our payment partners to relevant third parties including credit reference and fraud prevention agencies, who may keep a record of that information.
            </li>
            <li className={css.itemList}>
              We may share your contact details with third parties in order to send you gifts or loyalty rewards on behalf of Gousto.
            </li>
            <li className={css.itemList}>
              We may disclose your contact details to Trustpilot to enable it to email you inviting you to leave a review on our site.
            </li>
            <li className={css.itemList}>
              We may disclose personal data so far as reasonably necessary if we have reason to believe that it breaches our terms and conditions, or that such steps are necessary to protect us or others, or that a criminal act has been committed, or if there has been a complaint about content posted by you, or if we are required to do so by law or appropriate authority.
            </li>
          </ol>
        </li>
        <li className={css.itemList}>
          <Heading type="h2" size="fontStyleM">How to access and control your information?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>
              You have the right to request a copy of your information, to rectify your information, to opt out from marketing communications and to request the deletion of your information. Below, we describe the processes for making these requests.
            </li>
            <li className={css.itemList}>
              Update/rectify your information: you can easily correct/change your personal/contact information on &quot;My Details&quot; page by logging in to your account on our website or apps.
            </li>
            <li className={css.itemList}>
              Alternatively you can contact us:&nbsp;
              <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank" rel="noopener noreferrer">click here</a>
              .
            </li>
            <li className={css.itemList}>
              Opt out of marketing communications: you can easily change your change your marketing permissions on &quot;My Details&quot; page, under &quot;My communication preferences&quot; section by logging in to your account on our website or apps.
            </li>
            <li className={css.itemList}>
              Access your information: you have the right to request personal data that we hold about you, subject to us reserving the right to withhold such data to the extent permitted by law. Contact our Customer Care team for this request:&nbsp;
              <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank" rel="noopener noreferrer">click here</a>
              .
            </li>
            <li className={css.itemList}>
              Delete your information: you have the right to request to delete all the personal data that we hold about you. Contact our Customer Care team for this request:&nbsp;
              <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank" rel="noopener noreferrer">click here</a>
              .
            </li>
            <li className={css.itemList}>
              If you wish to contact us about anything to do with your data and Gousto, please contact us:&nbsp;
              <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank" rel="noopener noreferrer">click here</a>
              .
            </li>
            <li className={css.itemList}>
              For information about your rights under UK data protection laws, see the website of the&nbsp;
              <a href="http://www.ico.org.uk/" target="_black" rel="noopener noreferrer">UK Information Commissioner</a>
              .
            </li>
            <li className={css.itemList}>
              You can report any concern to the ICO by&nbsp;
              <a href="https://ico.org.uk/concerns/" target="_blank" rel="noopener noreferrer">clicking here</a>
              . We would, however, appreciate the chance to deal with your concerns before you approach the ICO so please contact us in the first instance:
              <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank" rel="noopener noreferrer"> click here</a>
              .
            </li>
            <li className={css.itemList}>We are registered with the Information Commissioner&apos;s Register of Data Controllers under number ZA029698.</li>
          </ol>
        </li>
      </ol>
    </section>

    <section className={css.mainSection}>
      <Heading type="h1" size="fontStyle2XL" isCenter>Cookies Policy</Heading>
      <p>Effective Date: 26/10/2020 (Version 2.0)</p>
      <ol className={css.orderedList}>
        <li className={css.itemList}>
          <Heading type="h2" size="fontStyleM">What about cookies?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>
              Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our website. A cookie is a small text file that is downloaded onto &apos;terminal equipment&apos; (eg a computer or smartphone) when the user accesses a website. It allows the website to recognise that user&apos;s device and store some information about the user&apos;s preferences or past actions.
            </li>
            <li className={css.itemList}>
              You can consent to, or block the use of, specific Cookies by activating the relevant settings in your browser or in the case of third party cookies - by contacting the third parties directly. We don&apos;t have access to the cookies which third parties place on the website; other than allowing them to be served. If you would like more information about these practices and to know your choices about not having this information used by certain of these companies, please visit www.youronlinechoices.com and www.networkadvertising.org/choices. In order to use some parts of our site, you will need to consent to Cookies. If you choose to withhold consent, or subsequently block cookies, some aspects of our site may not work properly and you may not be able to access all or part of the site.
            </li>
            <li className={css.itemList}>
              Generally, there are the following categories of cookies:
              <ol className={css.orderedList}>
                <li className={css.itemList}>
                  Strictly Necessary cookies: these cookies are essential for the operation of the website. They often improve the usability of the website for you by allowing you to proceed through many pages of the website quickly and easily without having to authenticate or reprocess each new area you visit. For example, the session cookie remembers your shopping cart selection so will have the items you selected when you are ready to check out.
                </li>
                <li className={css.itemList}>
                  Performance and analytics cookies: these cookies analyse how you use the site and to monitor performance so that we can provide a high quality experience to you and quickly identify issues that may arise. We also use cookies to understand, improve, develop and research products, features and services, to collect usage, viewing, logs, and technical information about you (such as event data), and to create logs and record when you access our site from different devices, such as your work computer or your mobile device.This information helps us to improve the way our website works, for example by making sure users find what they need easily. We predominantly use Google Analytics (“GA”) cookies to conduct analytics. Click&nbsp;
                  <a href="https://policies.google.com/technologies/types?gl=uk" target="_blank" rel="noopener noreferrer">here</a>
                  &nbsp;for more information about GA cookies. Click&nbsp;
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">here</a>
                  &nbsp;to opt out of GA cookies.
                </li>
                <li className={css.itemList}>
                  Targeting cookies: these cookies are used to serve users with content and adverts, and to collect information about your browsing habits and usage of the website to make adverts more relevant to you based on your visits to this and other websites. We may use remarketing technologies to enable third parties to display relevant and personalised ads to users through their networks. They are also used to limit the number of times users see an advert as well as help measure the effectiveness of an advertising campaign.
                </li>
                <li className={css.itemList}>
                  Social media cookies: We may use various social media and other third party features on our website including the&nbsp;
                  <a href="https://www.facebook.com/help/186325668085084/" target="_blank" rel="noopener noreferrer">like</a>
                  &nbsp;button from&nbsp;
                  <a href="http://www.facebook.com/help/cookies" target="_blank" rel="noopener noreferrer">Facebook</a>
                  , follow button from&nbsp;
                  <a href="https://twitter.com/privacy" target="_blank" rel="noopener noreferrer">Twitter</a>
                  ),&nbsp;
                  <a href="https://support.google.com/plus/answer/1319578?hl=en-GB" target="_blank" rel="noopener noreferrer">Plus +1</a>
                  &nbsp;button from&nbsp;
                  <a href="https://www.google.co.uk/policies/technologies/types/" target="_blank" rel="noopener noreferrer">Google</a>
                  , Pin It button from&nbsp;
                  <a href="http://about.pinterest.com/en/privacy-policy" target="_blank" rel="noopener noreferrer">Pinterest</a>
                  , share / follow button from&nbsp;
                  <a href="https://www.linkedin.com/legal/cookie-policy" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  , embed button from&nbsp;
                  <a href="https://www.google.co.uk/policies/technologies/types/" target="_blank" rel="noopener noreferrer">YouTube</a>
                  , These features may involve the relevant companies using cookies or linking your visit with cookies previously placed by them on your computer in order for them to collect information relating to your visit to our website or your interaction with their services or otherwise. Click the links shown above for further information about the specific features and those companies&apos; cookie / privacy practices generally as well as to opt out where this is possible.
                </li>
              </ol>
            </li>
            <li className={css.itemList}>
              We hope our use of cookies is clear and please be aware you can set your browser to reject cookies or you can delete them yourself if you wish. For further information on cookies, including how to use your browser to block them and how to delete cookies already stored on your device, visit:&nbsp;
              <a href="www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>
              .
            </li>
          </ol>
        </li>
      </ol>
    </section>
  </LayoutPageWrapper>
)

export {
  PrivacyStatement,
}
