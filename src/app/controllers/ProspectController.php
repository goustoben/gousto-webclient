<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class ProspectController extends BaseController
{

    /**
     * This captures form data to fill the prospective users data.
     * Only email and the step number are required as we want to capture as much as possible
     * It provides no response and should fail silently if there is a problem.
     * @return void
     */
    public function capture()
    {
        try {
            $prospect = [
                'email' 									=> Input::get('email'),
                'user_name_first' 							=> Input::get('fname'),
                'user_name_last' 							=> Input::get('lname'),
                'user_phone'								=> Input::get('phone'),
                'shipping_address_companyname'				=> Input::get('deliverycompanyname'),
                'shipping_address_line1'					=> Input::get('deliveryaddress1'),
                'shipping_address_line2'					=> Input::get('deliveryaddress2'),
                'shipping_address_line3'					=> Input::get('deliveryaddress3'),
                'shipping_address_town'						=> Input::get('deliverytown'),
                'shipping_address_county' 					=> Input::get('deliverycounty'),
                'shipping_address_postcode' 				=> Input::get('deliverypostcode'),
                'shipping_address_country'					=> 'gb',
                'shipping_address_delivery_instructions' 	=> Input::get('deliveryinstruction'),
                'step' => Input::get('step')
            ];

            if (in_array(Input::get('title'), array_keys(Info::get('salutation')))) {
                $prospect['user_salutation'] = strtolower(Input::get('title'));
            }

            $rules = [
                'email'	=> 'required',
                'step'	=> 'required'
            ];

            $validator = Validator::make($prospect, $rules);

            // if there is no email do not submit anything to the API
            if (!$validator->fails()) {
                $result = GoustoCore::create('prospect', $prospect);
            }
        } catch (GoustoCoreServiceErrorException $e) {
            $error = $e->getDetails();
            Log::warning($error);
        }
    }
}
