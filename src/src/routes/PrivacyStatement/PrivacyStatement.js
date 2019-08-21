import React from 'react'
import css from './PrivacyStatement.css'
import classnames from 'classnames'
import { Heading, LayoutPageWrapper } from 'goustouicomponents'
import Helmet from 'react-helmet'
import policy from 'config/policy'

const PrivacyStatement = () => (
  <LayoutPageWrapper>
    <Helmet
      title={policy.head.title}
      meta={policy.head.meta}
    />

    <section className={css.mainSection}>
      <Heading type='h1' size='xLarge' center>Privacy Statement</Heading>
      <p>Effective Date: 09/08/2018 (Version 2.2)</p>
      <ol className={css.orderedList}>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type='h2'>Who are we?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>We are SCA Investments Limited trading as "Gousto". We own and operate this website/app. Please contact us if you have any questions or feedback about this Privacy Statement : <a href="https://www.gousto.co.uk/help" target="_blank">click here</a>.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type='h2'>What’s the point of this Privacy Statement?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>This Privacy Statement tells you how we deal with your "personal data" (i.e. technical term for information about any identified or identifiable living person). Please read on to find out what kinds of personal data we collect, how we use and protect it, who we share it with, how long we keep it for and how you can access and rectify it.</li>
            <li className={css.itemList}>Please do not use our website or apps unless you are completely happy with this Privacy Statement.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type='h2'>Might the Privacy Statement change?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>It may well do. Whenever we have updated our Privacy Statement, we willl alert you via email. Please take that opportunity to re-read it. We will assume you agree to the revised Privacy Statement if you use the website or apps after the effective date shown at the top of the Privacy Statement.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type='h2'>What personal or other data do we collect?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>We collect and store the information which you give us via forms on our website or apps - such as your name, address, email address, phone number (“<strong>contact data</strong>”) - or when communicating with us by email, or in some other way.</li>
            <li className={css.itemList}>We also collect and store your IP address (“<strong>customer behaviour data</strong>”) to improve your shopping experience by suggesting suitable products for you, based on previous purchases, or recipes looked at.</li>
            <li className={css.itemList}>We collect your bank card details (<strong>payment information</strong>) in order to process payments and refunds.</li>
            <li className={css.itemList}>We collect <strong>survey data</strong> (biannual survey, NPS, etc.) which can include household makeup (number or kids and age bracket), age (bracket not birthday), gender and  food preferences/allergies in order to understand how we are serving different types of customers and what we need to do to improve their experience.</li>
            <li className={css.itemList}>Under GDPR, we will use the lawful basis of “contractual”, where we use <strong>contact</strong> and <strong>payment</strong> data to fulfil orders. When we use <strong>contact, survey, or customer behaviour</strong> data for marketing reasons, the lawful basis will be “consent”, or “legitimate interest”. If you would like further information, please contact us using the details within this privacy statement.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type='h2'>How do we use your personal data?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>We use “<strong>contact data</strong>” to provide our services : e.g. send service messages, communicate to you about your account/orders and to fulfil orders.</li>
            <li className={css.itemList}>If you have given permission, we may use your “<strong>contact data</strong>” to send you marketing emails, mails, calls or SMS with details of our, or third party goods or services which may be of interest to you, including information about special offers or promotions. </li>
            <li className={css.itemList}>We use “<strong>payment information</strong>” to process payments and refunds.</li>
            <li className={css.itemList}>We may use your <strong>IP address</strong> to recognise you when you visit, or return to our website or apps. This allows us to track anonymised traffic and usage patterns, prevent or detect fraud and help us improve our service. We may use cookies to do this. See below the Privacy Statement.</li>
            <li className={css.itemList}>If you supply us with a <strong>friend’s email address</strong> for the "Refer A Friend" programme, we will use that email address only to send a special offer to your friend. We will provide your name in the offer email to your friend, so that they know where we dot their contact details from.</li>
            <li className={css.itemList}>We may use information we collect on you to recommend you recipes and to improve our service for you and other customers.</li>
            <li className={css.itemList}>We retain your data during a period of 36 months months after the last order. We do that in order to comply with legal obligations, enforce our terms and conditions, prevent fraud, collect any fees owed, resolve disputes, troubleshoot problems, assist with any investigations and take other actions as permitted by law.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type='h2'>How do we protect personal data?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>Security is a high priority for us. We take appropriate precautions to protect personal data. We will make every effort to look after your data and treat it with the respect it deserves.</li>
            <li className={css.itemList}>Your data will be transferred, stored and/or processed outside the EEA as our suppliers sometimes operate from outside of the EEA. We will only transfer your data outside of the EEA in compliance with data protection laws and provided appropriate or suitable safeguards are in place to protect your data, these being either Standard Contractual Clauses, Binding Corporate Rules (including the Mastercard Binding Corporate Rules) or, in the case of transfers to the US, a Privacy Shield certification.  Please contact us if you would like details of the appropriate safeguards.</li>
          </ol>
        </li>
        <li className={classnames(css.itemList, css.paddingElement)}>
          <Heading type='h2'>To whom do we disclose personal data?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>We may allow access to your personal data by third parties who supply us with a service. Examples include e-commerce platform providers, couriers (to enable delivery of goods), website hosts, content delivery networks and businesses which assist us in undertaking communications, monitoring, testing or improving our website</li>
            <li className={css.itemList}>We may share your payment information (including your email address) with SagePay, checkout.com and First Data (our payment gateway and providers) in order to process the payments of your orders and any potential refund.</li>
            <li className={css.itemList}>Your personal data may be supplied by our payment partners to relevant third parties including credit reference and fraud prevention agencies, who may keep a record of that information.</li>
            <li className={css.itemList}>If you choose to opt-in to receive third party communications from selected partners, your personal data will be shared to relevant third parties to allow you to receive tailored communications about products that may be of interest to you.</li>
            <li className={css.itemList}>We share the data with our partner Epsilon Abacus (registered as Epsilon International UK Ltd), a company that manages the Abacus Alliance on behalf of UK retailers. The participating retailers are active in the clothing, collectables, food & wine, gardening, gadgets & entertainment, health & beauty, household goods, and home interiors categories. They share information on what their customers buy. Epsilon Abacus analyses this pooled information to help the retailers understand consumers’ wider buying patterns. From this information, retailers can tailor their communications, sending people suitable offers that should be of interest to them, based on what they like to buy.</li>
            <li className={css.itemList}>We may disclose your contact details to Trustpilot to enable it to email you inviting you to leave a review on our site.</li>
            <li className={css.itemList}>We may disclose personal data so far as reasonably necessary if we have reason to believe that it breaches our terms and conditions, or that such steps are necessary to protect us or others, or that a criminal act has been committed, or if there has been a complaint about content posted by you, or if we are required to do so by law or appropriate authority.</li>
          </ol>
        </li>
        <li className={css.itemList}>
          <Heading type='h2'>How to access and control your information?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>You have the right to request a copy of your information, to rectify your information, to opt out from marketing communications and to request the deletion of your information. Below, we describe the processes for making these requests.</li>
            <li className={css.itemList}><strong>Update/rectify your information:</strong> You can easily correct/change the following personal information on “My Details” page by logging in to your account on our website or apps:
              <ol className={css.orderedList}>
                <li className={css.itemList}>first name and last name</li>
                <li className={css.itemList}>phone number</li>
                <li className={css.itemList}>email address</li>
                <li className={css.itemList}>delivery address</li>
                <li className={css.itemList}>billing address</li>
                <li className={css.itemList}>payment details</li>
              </ol>
              Alternatively you can contact us : <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank">click here</a>.
                </li>
            <li className={css.itemList}><strong>Opt out of marketing communications:</strong> You can easily change your change your marketing permissions on "My Details" page, under "My communication preferences" section by logging in to your account on our website or apps.</li>
            <li className={css.itemList}><strong>Access your information:</strong> You have the right to request personal data that we hold about you, subject to us reserving the right to withhold such data to the extent permitted by law. Contact our Customer Care team for this request : <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank">click here</a></li>
            <li className={css.itemList}><strong>Delete your information:</strong> You have the right to request to delete all the personal data that we hold about you. Contact our Customer Care team for this request : <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank">click here</a></li>
            <li className={css.itemList}>If you wish to contact us about anything to do with your data and Gousto, please contact us  : <a href="https://gousto.zendesk.com/hc/en-gb/requests/new" target="_blank">click here</a></li>
            <li className={css.itemList}>For information about your rights under UK data protection laws, see the website of the <a href="http://www.ico.org.uk/" target="_black">UK Information Commissioner.</a></li>
            <li className={css.itemList}>You can report any concern to the ICO by <a href="https://ico.org.uk/concerns/" target="_blank">cliking here.</a></li>
            <li className={css.itemList}>We are registered with the Information Commissioner’s Register of Data Controllers under number ZA029698.</li>
          </ol>
        </li>
      </ol>
    </section>

    <section className={css.mainSection}>
      <Heading type='h1' size='xLarge' center>Cookies Policy</Heading>
      <p>Effective Date: 26/05/2015 (Version 1.0)</p>
      <ol className={css.orderedList}>
        <li className={css.itemList}>
          <Heading type='h2'>What about cookies?</Heading>
          <ol className={css.orderedList}>
            <li className={css.itemList}>We and/or third parties use cookies and other tracking technologies on our website. A cookie is an identifier (a small file of letters and numbers) that is sent to your computer. Our website’s functionality will be limited if you configure your browser to reject cookies.</li>
            <li className={css.itemList}>Cookies are widely used to make websites work, or work more efficiently, as well as to provide information to the website owner or others. Session cookies are temporary cookies that remain in the cookie file of your browser only until your browser is closed. They allow websites to link your actions during a browser session. Persistent cookies stay in the cookie file of your browser for longer (though how long will depend on the lifetime of the specific cookie). For further information on cookies, including how to use your browser to block them and how to delete cookies already stored on your device, visit: <a href="http://www.allaboutcookies.org" target="_blank">www.allaboutcookies.org</a>.</li>
            <li className={css.itemList}>Cookies are used on this website for the following purposes:
              <ol className={css.orderedList}>
                <li className={css.itemList}>Session cookies: We use session cookies to enable the website to keep track of your movement from page to page and store your selections so you do not get asked repeatedly for the same information. These cookies allow you to proceed through many pages of the website quickly and easily without having to authenticate or reprocess each new area you visit. For example, the session cookie remembers your shopping cart selection so will have the items you selected when you are ready to check out.</li>
                <li className={css.itemList}>Google Analytics ("GA") cookies: Google sets persistent cookies (up to two years) to recognize and count the number of website visitors as well as providing other information about the visit such as duration, route through the website and what sites the visitor came from. This information helps us to improve the way our website works, for example by making sure users find what they need easily. Click <a href="https://www.google.co.uk/policies/technologies/types/" target="_blank">here</a> for more information about GA cookies. Click <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">here</a> to opt out of GA cookies. </li>
                <li className={css.itemList}>Google advertising cookies (AdSense, Doubleclick): Google uses persistent advertising cookies (up to two years) in connection with Google advertising on our website to serve ads to you based on your visits to this and other websites and for various other purposes. Click <a href="http://www.google.com/policies/privacy/ads/" target="_blank">here</a> for more information and to opt out of Google’s advertising cookies.</li>
                <li className={css.itemList}>Microsoft Bing Ads cookies: Microsoft sets persistent cookies (up to two years) for conversion tracking purposes, i.e. to record details of transactions by users who visit our site after clicking on an advertisement of ours on another site. Click <a href="http://advertise.bingads.microsoft.com/en-uk/privacy-policy" target="_blank">here</a> for more information</li>
                <li className={css.itemList}>Social media cookies: We may use various social media and other third party features on our website including <a href="https://www.facebook.com/help/186325668085084/" target="_blank">like</a> button from <a href="http://www.facebook.com/help/cookies" target="_blank">Facebook</a>, follow button from <a href="https://twitter.com/privacy" target="_blank">Twitter</a>), <a href="https://support.google.com/plus/answer/1319578?hl=en-GB" target="_blank">Plus +1</a> button from <a href="https://www.google.co.uk/policies/technologies/types/" target="_blank">Google</a>, Pin It button from <a href="http://about.pinterest.com/en/privacy-policy" target="_blank">Pinterest</a>, share / follow button from <a href="https://www.linkedin.com/legal/cookie-policy" target="_blank">LinkedIn</a>, embed button from <a href="https://www.google.co.uk/policies/technologies/types/" target="_blank">YouTube</a>, These features may involve the relevant companies using cookies or linking your visit with cookies previously placed by them on your computer in order for them to collect information relating to your visit to our website or your interaction with their services or otherwise. Click the links shown above for further information about the specific features and those companies’ cookie / privacy practices generally as well as to opt out where this is possible.</li>
                <li className={css.itemList}>Olark cookies: Olark, our provider of live chat software, places session and persistent cookies (up to two years) on our site to enable the software to function properly as well as to remember you and your message history between visits. Click <a href="https://www.olark.com/help/cookies" target="_blank">here</a> for more information.</li>
                <li className={css.itemList}>Addthis cookies: Our website includes third party persistent cookies (up to 2 years) set by a third party Addthis in connection with the Addthis button designed to enable sharing via social media (Facebook, Twitter etc). AddThis requires us to tell you the following: "We allow third-party companies, including AddThis, to collect certain anonymous information when you visit our website. These companies may use non-personally identifiable information during your visits to this and other websites in order to provide advertisements about goods and services likely to be of greater interest to you. These companies typically use a cookie or a third party web beacon to collect this information. To learn more about this behavioral advertising practice, you can visit <a href="http://www.networkadvertising.org" target="_blank">www.networkadvertising.org</a>." Click <a href="http://www.addthis.com/privacy#.T9beWfF5HhU" target="_blank"></a>here for more information about AddThis privacy practices. Click <a href="http://www.addthis.com/privacy/opt-out" target="_blank">here</a> to prevent AddThis from collecting any information about you for online behavioural advertising. </li>
                <li className={css.itemList}>Third party advertising cookies: As do many other sites, we use third party advertisers and/or internet advertising companies working for them to fill ad space on our website including Appnexus (see <a href="http://www.appnexus.com/cookie-policy" target="_blank">here</a>) and AdRoll (see <a href="http://www.adroll.com/about/privacy" target="_blank">here</a>). These third parties may use persistent cookies and other similar technologies (known as action tags, single pixel gifs and web beacons) to assess information about your visits to this and other sites. This is so they can track the effectiveness of their campaigns (including whether these advertisements are clicked on or viewed by users and later purchases by such users), avoid showing you the same advertisement repeatedly and display advertisements on this and other sites tailored to your preferences. We do not have any access to or control over these third party technologies. If you would like more information about these practices and to know your choices about not having this information used by certain of these companies, please visit <a href="http://www.youronlinechoices.com" target="_blank">www.youronlinechoices.com</a> and <a href="http://www.networkadvertising.org/choices" target="_blank">www.networkadvertising.org/choices</a>. Please contact the third parties directly for more information about their privacy practices.</li>
              </ol>
            </li>
            <li className={css.itemList}>By continuing to use our website, we assume that you consent to use of the cookies outlined above.</li>
          </ol>
        </li>
      </ol>
    </section>
  </LayoutPageWrapper>
)

export default PrivacyStatement
