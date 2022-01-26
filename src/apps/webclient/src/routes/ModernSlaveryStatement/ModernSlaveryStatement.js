import React from 'react'
import { Heading, LayoutPageWrapper } from 'goustouicomponents'
import Helmet from 'react-helmet'
import modernSlavery from 'config/modernSlavery'
import css from './ModernSlaveryStatement.css'

const ModernSlaveryStatement = () => (
  <LayoutPageWrapper>
    <Helmet
      title={modernSlavery.head.title}
      meta={modernSlavery.head.meta}
    />

    <section className={css.mainSection}>
      <Heading type="h1" size="fontStyleL" isCenter>Modern Slavery Statement</Heading>
      <p>This statement has been published in accordance with the Modern Slavery Act 2015. The statement sets out the steps taken by SCA Investments T/A Gousto (“Gousto”) to prevent modern slavery and human trafficking in its business and supply chains.</p>
      <p>Gousto are committed to acting ethically and with integrity in all business dealings and relationships and to implementing and enforcing effective systems and controls to ensure modern slavery is not taking place anywhere in their business or in any of their supply chains.</p>
      <Heading type="h2" size="fontStyleM">Who are Gousto</Heading>
      <p>Gousto are a UK recipe box business. Gousto supplies subscribers with boxes which include ready-measured fresh and longer life ingredients coupled with easy to follow recipes. The business was founded in June 2012 with a fulfillment centre based in Spalding, Lincolnshire and a support centre in Shepherds Bush, London.</p>
      <p>Gousto is a business passionate about sustainability and its vision for every meal to leave the planet better off. Teams are working hard across the whole supply chain and operations in areas such as food waste reduction and removing plastic. Through its website Gousto also retails a specially curated range of finished goods via its online market.</p>
      <p>The board of directors has overall responsibility for ensuring the business complies with our legal and ethical obligations. The General Counsel together with the Head of Buying has primary and day-to-day responsibility for implementing the Company’s Anti Slavery and Human Trafficking policy, monitoring its use and effectiveness, dealing with any queries about it, and auditing internal control systems and procedures to ensure they are effective in countering modern slavery.</p>
      <Heading type="h2" size="fontStyleM">Gousto Supply Chains</Heading>
      <p>Gousto source food ingredients from over 40 countries through UK importers and suppliers.Gousto does not currently have direct relationships with overseas suppliers at this time, however the UK based suppliers may have subsidiaries and joint ventures in other territories. All purchases and contracts are completed in the UK, Gousto does not employ agents to act on their behalf.</p>
      <p>The indirect supply chains include services and products that are not for resale, instead they support the fulfillment centre and London headquarters. These services may include but are not limited to; operational infrastructure, courier and logistics services, warehousing, maintenance, IT and professional services such as marketing, human resources and consultant fees.</p>
      <Heading type="h2" size="fontStyleM">Progress to date</Heading>
      <ol className={css.orderedList}>
        <li className={css.itemList}>Modern slavery training has been rolled out across the business, upskilling employees to help identify and raise any concerns throughout the supply chain.</li>
        <li className={css.itemList}>Supplier approval and onboarding process has been reviewed with updated due diligence requirements such as improved product specifications and questionnaires completed.</li>
        <li className={css.itemList}>Risk registers and whistle-blowing provision have been put in place across the business.</li>
        <li className={css.itemList}>Gousto has recently joined Sedex. (Sedex membership allows companies to understand their suppliers performancearound labour rights, health &amp; safety, the environment and business ethics)</li>
        <li className={css.itemList}>In the absence of Sedex membership we require suppliers to complete an Ethical Trading questionnaire.</li>
      </ol>
      <Heading type="h2" size="fontStyleM">Focus for next 12 months</Heading>
      <ol className={css.orderedList}>
        <li className={css.itemList}>Enhanced training will be delivered for the Gousto buying team.</li>
        <li className={css.itemList}>Sedex membership will allow an improved understanding of Gousto supply chains (particuarly food) and increase the effectiveness of identifying slavery and trafficking. All primary suppliers will be required to link with Gousto and all suppliers must be Sedex registered by end 2021.</li>
        <li className={css.itemList}>Growing the remit of the procurement function to increase coverage of spend and supplier assessment, in addition to the introduction of further third party contract approval stages.</li>
        <li className={css.itemList}>Continuously review the Gousto supplier approval process and update our supplier terms and conditions.</li>
      </ol>
      <p>Throughout the year ahead the business will continuously evaluate risks in relation to Modern Slavery and will ensure the strategy is updated accordingly.</p>
    </section>
  </LayoutPageWrapper>
)

export {
  ModernSlaveryStatement,
}
