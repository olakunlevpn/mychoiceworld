<?php

namespace App\Filament\Resources\Reviews\Schemas;

use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;

class ReviewForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Placeholder::make('rating_stars')
                    ->label(__('review.rating'))
                    ->content(function ($record): HtmlString {
                        $rating = $record?->rating ?? 0;
                        $stars = '';

                        for ($i = 1; $i <= 5; $i++) {
                            $color = $i <= $rating ? '#14878E' : '#374151';
                            $stars .= '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="'.$color.'" style="width: 24px; height: 24px; display: inline-block;"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" /></svg>';
                        }

                        return new HtmlString('<div style="display: flex; gap: 2px; align-items: center;">'.$stars.'<span style="margin-left: 8px; color: #9ca3af; font-size: 0.875rem;">'.$rating.'/5</span></div>');
                    }),
                Toggle::make('is_published')
                    ->label(__('review.is_published')),
                Textarea::make('comment')
                    ->label(__('review.comment'))
                    ->disabled()
                    ->columnSpanFull(),
                Textarea::make('vendor_reply')
                    ->label(__('review.vendor_reply'))
                    ->columnSpanFull(),
            ]);
    }
}
