<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TestUser;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $testUser = TestUser::query();

    	$testUser = $testUser->selectStatusWithTest();

        if($request->filled("from_id") && $request->filled("to_id")){
            $testUser = $testUser->whereBetween("id",[$request->from_id,$request->to_id]);
        }

    	if($request->filled("name")){
    		$testUser = $testUser->orWhereHas("test",function($q) use ($request) {
    			return $q->where("name","like","%".$request->name."%");
    		});
    	}

    	if($request->filled("mapel")){
    		$testUser = $testUser->orWhereHas("test",function($q) use ($request) {
    			return $q->where("mapel","like","%".$request->mapel."%");
    		});
    	}

    	$testUser = $testUser
    		->orderBy(
    			$request->order_by ?? "id",
    			$request->order ?? "desc"
    		)
    		->paginate($request->per_page ?? 10);

        return response()->json($testUser);       
    }
   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($status)
    {    
        $testUser = TestUser::with("test")->findOrFail($status);

        return response()->json($testUser);
    }
}
