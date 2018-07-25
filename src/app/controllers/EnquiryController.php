<?php

class EnquiryController extends BaseController
{
    public function question()
    {
        $input = Input::except('_token');
        try {
            $data = GoustoCore::create('enquiry', $input);
            return Response::json([
                'status' => 'ok',
                'data' => $data
            ]);
        } catch (Exception $e) {
            return Response::json([
                'status' => 'error',
                'error' => $e->getMessage()
            ]);
        }
    }
}
