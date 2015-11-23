<?php

class ThemeHouse_SpellChecker_ControllerPublic_SpellChecker extends XenForo_ControllerPublic_Abstract
{

    public function actionIndex()
    {
        //$this->_assertPostOnly();

        new ThemeHouse_SpellChecker();

        exit();
    } /* END actionIndex */


    protected function _checkCsrf($action)
    {
        return;
    } /* END _checkCsrf */
}