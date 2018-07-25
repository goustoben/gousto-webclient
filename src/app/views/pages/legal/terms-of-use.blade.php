@extends('layouts.text')
@include('includes.meta', array('meta' => Config::get('meta.main.terms-of-use')))
@section('bodyClass') class="static-pages" @stop
@section('content')
<div class="container">
	<h1 data-selid="main-title">Website Terms of Use</h1>
	<div class="row">
		<div class="col-sm-12 highlight-links">
			<p>Effective Date: 16/04/2018 (Version 2.0)</p>
			<ol>
				<li>
					<h4>Introduction</h4>
					<ol>
						<li>This website is owned and operated by SCA Investments Limited trading as “Gousto”. Our company information is at the end of this document.</li>
						<li>Please read these terms and conditions carefully. They cancel and replace any previous versions. Please print or save these terms for future use as we cannot guarantee that they will remain accessible on our website in future. These terms and conditions are available in the English language only.</li>
						<li>These terms and conditions apply to use of our website and our digital services including but not limited to our apps (the term “website” shall hereafter refer to the website and our other digital services). The sale of goods via our website is subject to separate terms and conditions.</li>
					</ol>
				</li>
				<li>
					<h4>Changes to the terms and conditions</h4>
					<ol>
						<li>We may change these terms and conditions by posting the revised version on our website at any time. Please check our website from time to time. You will be bound by the revised agreement if you continue to use our website following the effective date shown.</li>
					</ol>
				</li>
				<li>
					<h4>Acceptable use policy</h4>
					<ol>
						<li>You agree that you will not in connection with our website:
							<ol>
								<li>breach any applicable law, regulation or code of conduct or infringe any intellectual property or other rights of others;</li>
								<li>publish or send any information (including links or references to other content), or otherwise behave in a manner, which:
									<ol>
										<li>is unlawful, defamatory, threatening, harassing, invasive of privacy, offensive, vulgar, racist, hateful, discriminatory, obscene, pornographic, sexually suggestive, promoting of self-harm, misleading, abusive or deceptive;</li>
										<li>infringes any intellectual property or other rights of others;</li>
										<li>involves phishing or scamming or similar; or</li>
										<li>we otherwise reasonably consider to be inappropriate;</li>
									</ol>
								</li>
								<li>sell access to our website;</li>
								<li>sell advertising, sponsorship or promotions on or in connection with content except where explicitly authorized by us;</li>
								<li>use our website for junk mail, spam, pyramid or similar or fraudulent schemes;</li>
								<li>do anything which may have the effect of disrupting our website including worms, viruses, software bombs or mass mailings;</li>
								<li>do anything which may negatively affect other users’ enjoyment of our website;</li>
								<li>gain unauthorised access to any part of our website or equipment used to provide our website;</li>
								<li>use any automated means to interact with our systems excluding public search engines; or</li>
								<li>attempt, encourage or assist any of the above.</li>
							</ol>
						</li>
					</ol>
				</li>
				<li>
					<h4>Content</h4>
					<ol>
						<li>You acknowledge that any information published or sent on or via our service by other users is the sole responsibility of the person from whom such content originated and we are not responsible for it.</li>
						<li>We cannot guarantee that any general information that we may make available on our website is accurate or up to date. You rely on it at your own risk.</li>
						<li>We reserve the right without notice or refund to suspend, alter, remove or delete content or to disclose to the relevant authorities any content or behaviour if it is the subject of complaint or where we have reason to believe that it breaches our terms and conditions, or that such steps are necessary to protect us or others, or that a criminal act has been committed, or if we are required to do so by law or appropriate authority.</li>
					</ol>
				</li>
				<li>
					<h4>Privacy</h4>
					<ol>
						<li>You acknowledge and agree that we may process your personal data in accordance with the terms of our <a href="{{{ URL::to('privacy-statement') }}}">privacy and cookies policy</a> which is subject to change from time to time.</li>
					</ol>
				</li>
				<li>
					<h4>Functioning of our website</h4>
					<ol>
						<li>We do not guarantee that our website will be uninterrupted or error-free and we are not responsible for any losses arising from such errors or interruptions. We are entitled, without notice and without liability, to suspend the website for repair, maintenance, improvement or other technical reason and to make changes to our website.
						</li>
					</ol>
				</li>
				<li>
					<h4>Your account</h4>
					<ol>
						<li>If we permit you to create an account on our website, this is for your personal use only and is non-transferable. You must not authorise or permit any other person to use your account. You must take reasonable care to protect and keep confidential your password and other account or identity information. You must notify us immediately of any apparent breach of security such as loss, theft, misuse or unauthorised disclosure or use of a password. You are responsible for third parties who use your account or identity (unless and to the extent that we are at fault).</li>
						<li>We are entitled at any time for any reason and with or without notice to terminate your account on our site. If you wish to have any data stored on you deleted or wish to view a copy of this data, follow the process on the Privacy Policy.</li>
					</ol>
				</li>
				<li>
					<h4>Intellectual property rights</h4>
					<ol>
						<li>All trade marks, logos, content (including our website’s structure and layout), graphics, images, photographs, animation, videos, text and software used on this site are our intellectual property or that of our suppliers, partners or other users. For the purposes of your personal use only, you may view such material on your screen and print a single copy. You may not otherwise use, sublicense, retrieve, display, modify, copy, print, sell, distribute, download, hire, reverse engineer (unless permitted by applicable law) or create extracts of, or derivative works from, such material without our specific prior written consent.</li>
						<li>Just to be clear - you must not collect, scrape, harvest, frame or deep-link to any information on our website without our specific prior written consent.</li>
						<li>You license (i.e. permit) us to use your user generated content both on our own website and also, for marketing purposes, on other channels including different websites, social media and emails. User generated content includes but is not limited to your comments, photos, recipe ratings and reviews.</li>
					</ol>
				</li>
				<li>
					<h4>Third party websites / advertising / services</h4>
					<ol>
						<li>We may link to third party websites which may be of interest to you and/or include third party advertising on our site and/or use third party-provided services on our site. We do not recommend or endorse, nor are we legally responsible for, those sites or services. You use such third party sites or services at your own risk.</li>
					</ol>
				</li>
				<li>
					<h4>Liability</h4>
					<ol>
						<li>Nothing in this agreement in any way limits or excludes our liability for negligence causing death or personal injury or for fraudulent misrepresentation or for anything which may not legally be excluded or limited. In this section, any reference to us includes our employees and agents.</li>
						<li>You must give us a reasonable opportunity to remedy any matter for which we are potentially liable before you incur any costs remedying the matter yourself.</li>
						<li>If you are a consumer (ie not acting in the course of a business), we shall not be liable for any loss or damage caused by us or our employees or agents in circumstances where:
							<ol>
								<li>there is no breach of a legal duty of care owed to you by us or by any of our employees or agents;</li>
								<li>such loss or damage was not foreseeable (meaning it was not an obvious consequence of our breach or not contemplated by you and us at the time we entered into this contract);</li>
								<li>such loss or damage is caused by you, for example by not complying with this agreement; or</li>
								<li>such loss or damage relates to a business.</li>
							</ol>
						</li>
						<li>If you are a consumer (ie not acting in the course of a business), you will be liable for any reasonably foreseeable loss or damage we suffer arising from your breach of this agreement or misuse of our website (subject of course to our obligation to mitigate any losses).</li>
						<li>The following clauses apply only if you are a business:
							<ol>
								<li>In no event (including our own negligence) will we be liable for any:
									<ol>
										<li>economic losses (including, without limit, loss of revenues, profits, contracts, business or anticipated savings);</li>
										<li>loss of goodwill or reputation; </li>
										<li>special, indirect or consequential losses; or</li>
										<li>damage to or loss of data</li>
										<li>(even if we have been advised of the possibility of such losses).</li>
									</ol>
								</li>
								<li>You will indemnify us against all claims and liabilities directly or indirectly related to your use of the website and/or breach of this agreement.</li>
								<li>To the extent allowed by law, you and we exclude all terms, whether imposed by statute or by law or otherwise, that are not expressly stated in this agreement.</li>
								<li>This agreement constitutes the entire agreement between us with respect to its subject matter and supersedes any previous communications or agreements between us. We both acknowledge that there have been no misrepresentations and that neither of us has relied on any pre-contractual statements. Liability for misrepresentation (excluding fraudulent misrepresentation) relating to the terms of this agreement is excluded.</li>
							</ol>
						</li>
					</ol>
				</li>
				<li>
					<h4>English law</h4>
					<ol>
						<li>These terms and conditions shall be governed by English law and any disputes will be decided only by the English courts.</li>
					</ol>
				</li>
				<li>
					<h4>General</h4>
					<ol>
						<li>We may send all notices under this agreement by email to the most recent email address you have supplied to us (unless otherwise stated in this agreement). Headings used in this agreement are for information and not binding. Any failure by either party to exercise or enforce any right or provision of this agreement does not mean this is a “waiver” (i.e. that it cannot be enforced later). If any part of this agreement is ineffective or unenforceable for any reason, then it will be replaced with a provision which as far as possible achieves the same thing and the rest of the agreement shall continue to apply. We may transfer this agreement to a third party but this will not affect your rights or obligations. A person who is not a party to this agreement shall have no rights to enforce this agreement except insofar as expressly stated otherwise.</li>
					</ol>
				</li>
				<li>
					<h4>Complaints</h4>
					<ol>
						<li>If you have any complaints, please contact us via the ‘get in touch’ button at the bottom of our <a href="{{{ URL::to('help') }}}">Help Page</a>, or call our customer care team on 02036999996. </li>
					</ol>
				</li>
				<li>
					<h4>Company information</h4>
					<ol>
						<li>Company name: SCA Investments Limited</li>
						<li>Country of incorporation: England and Wales.</li>
						<li>Registered number: 08027386</li>
						<li>Registered office and trading address: 3 Morris House, Swainson Road, London W3 7UP, UK.</li>
						<li>Other contact information: See our website.</li>
						<li>VAT number: 133 6007 48</li>
					</ol>
				</li>
			</ol>
		</div>
	</div>
</div>
@stop
