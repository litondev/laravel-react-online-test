<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskFile extends Model
{
    protected $guarded = ['id'];

    public function task(){
    	return $this->belongsTo(Task::class);
    }
}
