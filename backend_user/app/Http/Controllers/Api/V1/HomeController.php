<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TestUser;

class HomeController extends Controller
{
    public function index(){
    	return response()->json(
    		// TestUser::query()
    		// ->with("test")
    		// ->where("user_id",auth()->user()->id)
    		// ->whereHas("test",function($q){
    		// 	return $q->whereBetween("start_at",[
	    	// 		now()->setTime(0,0,0)->toDateTimeString(),
    		// 		now()->setTime(23,59,59)->toDateTimeString()
    		// 	]);
    		// })
    		// ->get()
    	);
    }
}
