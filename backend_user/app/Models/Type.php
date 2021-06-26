<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $guarded = ['id'];

    public function tests(){
    	return $this->hasMany(Test::class);
    }
}
