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

    public function scopeSelectStatusWithTest($query){
    	return $query->select('id','test_id')
    		->with('test:id,name,mapel,start_at,end_at');
    }
}
