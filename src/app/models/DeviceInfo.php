<?php

class DeviceInfo
{
    private $_device = '';
    private $_platform = ['name' => '', 'version' => ''];
    private $_browser = ['name' => '', 'version' => ''];

    public function __construct()
    {
        $this->_device = Agent::device();
        $platform_name = Agent::platform();
        $this->_platform = [
            'name' => $platform_name,
            'version' => Agent::version($platform_name)
        ];
        $browser_name = Agent::browser();
        $this->_browser = [
            'name' => $browser_name,
            'version' => Agent::version($browser_name)
        ];
    }

    public function toArray()
    {
        return [
            'device_info' => [
                'name' => $this->_device,
                'platform' => $this->_platform,
                'browser' => $this->_browser
            ]
        ];
    }
}
