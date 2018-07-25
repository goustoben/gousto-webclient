<?php

class GoustoPresenter extends Illuminate\Pagination\Presenter
{

    /**
     * Get HTML wrapper for a page link.
     *
     * @param  string  $url
     * @param  int  $page
     * @return string
     */
    public function getPageLinkWrapper($url, $page)
    {
        return '<li><a href="'.$url.'">'.$page.'</a></li>';
    }

    /**
     * Get HTML wrapper for disabled text.
     *
     * @param  string  $text
     * @return string
     */
    public function getDisabledTextWrapper($text)
    {
        return '<li class="disabled"><span>'.$text.'</span></li>';
    }

    /**
     * Get HTML wrapper for active text.
     *
     * @param  string  $text
     * @return string
     */
    public function getActivePageWrapper($text)
    {
        return '<li class="active"><span>'.$text.'</span></li>';
    }

    public function render()
    {
        // The hard-coded thirteen represents the minimum number of pages we need to
        // be able to create a sliding page window. If we have less than that, we
        // will just render a simple range of page links insteadof the sliding.
        if ($this->lastPage < 13) {
            $content = $this->getPageRange(1, $this->lastPage);
        } else {
            $content = $this->getPageSlider();
        }

        return $this->getPrevious('<').$content.$this->getNext('>');
    }
}
