<?php

use Gousto\ApiClient\Exceptions\GoustoCoreServiceErrorException;

class FaqCategoryController extends BaseController
{
    protected function getCategoriesWithFaqs()
    {
        $search_query = (Input::has('q')) ? ['q' => Input::get('q')] : [];
        $faqs = GoustoCore::fetch('faqs', $search_query);
        $faq_categories = GoustoCore::fetch('faq-categories');
        $categories = [];
        foreach ($faq_categories as $category) {
            if (!isset($category['faqs'])) {
                $category['faqs'] = [];
            }
            foreach ($faqs as $index => $faq) {
                if ($faq['faq_category_id'] === $category['id']) {
                    $category['faqs'][] = $faq;
                    unset($faqs[$index]);
                }
            }
            $categories[] = $category;
        }
        return $categories;
    }

    public function display()
    {
        try {
            $categories = $this->getCategoriesWithFaqs();
            return View::make('pages.learn-more', compact('categories'));
        } catch (Exception $e) {
            $error = $e->getMessage();
            Log::error($error);
            App::abort(500);
        }
    }
}
