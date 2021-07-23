<?php

declare(strict_types=1);

namespace Bnomei;

use Kirby\Toolkit\F;

final class Kloppy
{
    public static function copyPlopfile(string $src, string $target): bool
    {
        if (! F::exists($target)) {
            return F::copy($src, $target);
        }
        return true;
    }
}
