<?php

namespace App\Enums;

enum ItemStatus: string
{
    case Lost = 'lost';
    case Found = 'found';
    case Claimed = 'claimed';

    public function label(): string
    {
        return match ($this) {
            self::Lost => 'Lost',
            self::Found => 'Found',
            self::Claimed => 'Claimed',
        };
    }
}
