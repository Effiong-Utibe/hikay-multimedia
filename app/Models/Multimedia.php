<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\MediaCollections\Models\Media as SpatieMedia;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Multimedia extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\MultimediaFactory> */
    use HasFactory, InteractsWithMedia;
      protected $fillable = [
        'title',
        'description',
        'tag',
        'category_id',
        'file_path',

    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function registerMediaConversions(?SpatieMedia $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(300)
            ->height(200)
            ->sharpen(10)// optional, remove if you want queued conversion
            ->extractVideoFrameAtSecond(1) // for videos, extract a frame at 1 second
            ->performOnCollections('video'); // only perform this conversion on the 'video' collection
    }
}
