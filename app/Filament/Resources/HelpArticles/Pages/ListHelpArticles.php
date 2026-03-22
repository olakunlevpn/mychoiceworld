<?php

namespace App\Filament\Resources\HelpArticles\Pages;

use App\Filament\Resources\HelpArticles\HelpArticleResource;
use Filament\Resources\Pages\ManageRecords;

class ListHelpArticles extends ManageRecords
{
    protected static string $resource = HelpArticleResource::class;
}
