<?php

class BaseController extends Controller
{
    protected $user_view_root = 'pages';
    protected $admin_view_root = 'cms';

    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if (! is_null($this->layout)) {
            $this->layout = View::make($this->layout);
        }
    }

    protected function coreProvider()
    {
        $provider = '';
        if ($this->_userType() === 'admin') {
            $provider = 'GoustoAdminService';
        } else {
            $provider = 'GoustoCoreService';
        }
        return App::make($provider);
    }

    protected function viewMaker($view_name, $data = [])
    {
        if ($this->_userType() === 'admin') {
            $view = $this->admin_view_root . '.' . $view_name;
        } else {
            $view = $this->user_view_root . '.' . $view_name;
        }
        return View::make($view, $data);
    }

    private function _userType()
    {
        return Session::get('user_type', 'user');
    }
}
