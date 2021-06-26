<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $guarded = ['id'];

    public function type(){
    	return $this->belongsTo(Type::class);
    }

    public function tasks(){
    	return $this->hasMany(Task::class);
    }

    public function test_users(){
    	return $this->hasMany(TaskUser::class);
    }
}
