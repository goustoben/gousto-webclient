import React from 'react'
import Hero from './Hero'
import Values from './Values'
import SubHero from './SubHero'
import FadeHero from './FadeHero'
import Perks from './Perks'
import Openings from './Openings'
import Helmet from 'react-helmet'

const Jobs = () => (
	<div>
		<Helmet
		  title="Job Vacancies & Careers at Gousto"
		  meta={[
		    {
		      name: 'description',
		      content: 'Read more about our latest job opportunities and discover more about working at Gousto',
		    },
		    {
		      property: 'og:title',
		      content: 'Job Vacancies & Careers at Gousto',
		    },
		    {
		      property: 'og:description',
		      content: 'Read more about our latest job opportunities and discover more about working at Gousto',
		    },
		    {
		      name: 'twitter:title',
		      content: 'Job Vacancies & Careers at Gousto',
		    },
		    {
		      name: 'twitter:description',
		      content: 'Read more about our latest job opportunities and discover more about working at Gousto',
		    },
		  ]}
		/>
		<Hero />
		<Values />
		<SubHero imageName={2} />
		<Perks />
		<FadeHero />
		<Openings />
		<SubHero imageName={4} />
	</div>
)

export default Jobs
