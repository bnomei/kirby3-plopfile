<?php

@include_once __DIR__ . '/vendor/autoload.php';

if (! class_exists('Bnomei\Kloppy')) {
    require_once __DIR__ . '/classes/Kloppy.php';

    // site/plugins/kirby3-kloppy
    \Bnomei\Kloppy::copyPlopfile(
        __DIR__ . '/example.plopfile.js', 
        realpath(__DIR__ . '/../../../') . 'plopfile.js'
    );
}

Kirby::plugin('bnomei/kloppy', [

]);
