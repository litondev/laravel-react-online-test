<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TestUser extends Model
{
    protected $guarded = ['id'];

    public function user(){
    	return $this->belongsTo(User::class);
    }

    public function test(){
    	return $this->belongsTo(Test::class);
    }
}
