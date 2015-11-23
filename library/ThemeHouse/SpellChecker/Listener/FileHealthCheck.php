<?php

class ThemeHouse_SpellChecker_Listener_FileHealthCheck
{

    public static function fileHealthCheck(XenForo_ControllerAdmin_Abstract $controller, array &$hashes)
    {
        $hashes = array_merge($hashes,
            array(
                'library/ThemeHouse/SpellChecker/ControllerPublic/SpellChecker.php' => 'fcd5c9dbb01d48a9d42db490db2bf7c8',
                'library/ThemeHouse/SpellChecker/Driver/PSpell.php' => '3403a3727e6af91980f96b013af1a0ba',
                'library/ThemeHouse/SpellChecker/Driver.php' => 'e8d9a421b0f6b246c3994da55cbf0e42',
                'library/ThemeHouse/SpellChecker/Install/Controller.php' => '64949702a198d9782a47ace9527d7d09',
                'library/ThemeHouse/SpellChecker/Route/Prefix/SpellChecker.php' => '1b76606a5d83cc279f1b72de4770b329',
                'library/ThemeHouse/SpellChecker.php' => '3b1d6407cffa8632a150909a68b2793c',
                'library/ThemeHouse/Install.php' => '18f1441e00e3742460174ab197bec0b7',
                'library/ThemeHouse/Install/20151109.php' => '2e3f16d685652ea2fa82ba11b69204f4',
                'library/ThemeHouse/Deferred.php' => 'ebab3e432fe2f42520de0e36f7f45d88',
                'library/ThemeHouse/Deferred/20150106.php' => 'a311d9aa6f9a0412eeba878417ba7ede',
                'library/ThemeHouse/Listener/ControllerPreDispatch.php' => 'fdebb2d5347398d3974a6f27eb11a3cd',
                'library/ThemeHouse/Listener/ControllerPreDispatch/20150911.php' => 'f2aadc0bd188ad127e363f417b4d23a9',
                'library/ThemeHouse/Listener/InitDependencies.php' => '8f59aaa8ffe56231c4aa47cf2c65f2b0',
                'library/ThemeHouse/Listener/InitDependencies/20150212.php' => 'f04c9dc8fa289895c06c1bcba5d27293',
            ));
    }
}