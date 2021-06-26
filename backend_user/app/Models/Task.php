<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded = ['id'];

    public function test(){
    	return $this->belongsTo(Test::class);
    }

    public function answers(){
    	return $this->hasMany(Answer::class);
    }

    public function task_files(){
    	return $this->hasMany(TaskFile::class);
    }
}
