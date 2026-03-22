<?php

namespace App\Concerns;

use Illuminate\Support\Collection;

trait SearchableWithFallback
{
    /**
     * Attempt Scout search, return IDs on success or null to signal fallback to LIKE scope.
     *
     * @param  class-string  $modelClass
     * @return Collection<int, mixed>|null
     */
    protected function searchIds(string $modelClass, string $term): ?Collection
    {
        try {
            return $modelClass::search($term)->keys();
        } catch (\Exception) {
            return null;
        }
    }
}
