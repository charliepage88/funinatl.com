<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    use HasFactory;

    /**
    * @var array
    */
    protected $fillable = [
        'name',
        'email',
        'body',
        'reviewed'
    ];

    /**
    * @var array
    */
    protected $casts = [
        'reviewed' => 'boolean'
    ];
}
