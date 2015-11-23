<?php

/**
 * Spellchecker class
 *
 * @package jQuery Spellchecker
 * (https://github.com/badsyntax/jquery-spellchecker)
 * @author Richard Willis
 * @copyright (c) Richard Willis
 * @license
 * https://github.com/badsyntax/jquery-spellchecker/blob/master/LICENSE-MIT
 */

class ThemeHouse_SpellChecker
{

    public function __construct()
    {
        $driver = $_POST['driver'];
        $action = $_POST['action'];
        $lang = $_POST['lang'];

        if (!$driver) {
            new XenForo_Exception('Driver not found in request');
        }
        if (!$action) {
            new XenForo_Exception('Action not found in request');
        }
        if (!$lang) {
            new XenForo_Exception('Lang not found in request');
        }

        $this->load_driver($driver, $lang);
        $this->execute_action($action);
    } /* END __construct */

    public function load_driver($driver = NULL, $lang = NULL)
    {
        $base_driver_path = 'ThemeHouse/SpellChecker/Driver.php';
        $driver_path = 'ThemeHouse/SpellChecker/Driver/' . $driver . '.php';

        if (!file_exists($driver_path)) {
            new XenForo_Exception('Driver does not exist on file system');
        }

        require_once $base_driver_path;
        require_once $driver_path;

        $driver_class = 'ThemeHouse_SpellChecker_Driver_' . $driver;

        $this->driver = new $driver_class(array(
            'lang' => $lang
        ));
    } /* END load_driver */

    public function execute_action($action = NULL)
    {
        if (!method_exists($this->driver, $action)) {
            new XenForo_Exception('Action does not exist on driver');
        }

        $this->driver->{$action}();
    } /* END execute_action */
}