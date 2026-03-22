<?php

namespace App\Jobs;

use App\Models\ProductImage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProcessProductImage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public ProductImage $productImage,
    ) {}

    public function handle(): void
    {
        $disk = Storage::disk('public');
        $path = $this->productImage->url;

        if (! $disk->exists($path)) {
            return;
        }

        $manager = new ImageManager(new Driver);
        $image = $manager->read($disk->path($path));

        $image->scaleDown(width: 1200);
        $image->save();

        $thumbnailPath = $this->generateThumbnailPath($path);
        $thumbnail = $manager->read($disk->path($path));
        $thumbnail->cover(400, 400);
        $thumbnail->save($disk->path($thumbnailPath));

        $this->productImage->update([
            'thumbnail_url' => $thumbnailPath,
        ]);
    }

    private function generateThumbnailPath(string $originalPath): string
    {
        $directory = dirname($originalPath);
        $filename = pathinfo($originalPath, PATHINFO_FILENAME);
        $extension = pathinfo($originalPath, PATHINFO_EXTENSION);

        return $directory.'/'.$filename.'_thumb.'.$extension;
    }
}
