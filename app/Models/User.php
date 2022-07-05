<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
    * Events
    *
    * @return Collection
    */
    public function events()
    {
        return $this->hasMany(Event::class, 'user_id');
    }

    /**
     * To Searchable Array
     *
     * @return array
     */
    public function toSearchableArray()
    {
        // user data
        $fields = [
            'id',
            'name',
            'email'
        ];

        $user = [];
        foreach($fields as $field) {
            $user[$field] = $this->$field;
        }

        $user['created_at'] = $this->created_at->toAtomString();
        $user['updated_at'] = $this->updated_at->toAtomString();

        return $user;
    }

    /**
     * Get Formatted Array
     *
     * @return array
     */
    public function getFormattedArray()
    {
        // user data
        $fields = [
            'id',
            'name',
            'email'
        ];

        $user = [];
        foreach($fields as $field) {
            $user[$field] = $this->$field;
        }

        $user['created_at'] = $this->created_at->toAtomString();
        $user['updated_at'] = $this->updated_at->toAtomString();

        return $user;
    }
}
