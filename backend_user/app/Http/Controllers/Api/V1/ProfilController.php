<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\{
	ProfilUploadRequest,
	ProfilUpdateRequest
};
use DB;
use App\Uploads\UploadProfilPhoto;

class ProfilController extends Controller
{
    public function upload(ProfilUploadRequest $request){    	
    	try{
    		DB::beginTransaction();

    		$oldPhoto = auth()->user()->photo_original;

        	auth()->user()->update([
          		"photo" => UploadProfilPhoto::upload()
        	]);

			UploadProfilPhoto::delete($oldPhoto);

    		DB::commit();

    		return response()->json([
				"status" => "Success",
				"message" => trans("profil.success-upload")
    		]);
    	}catch(\Exception $e){
    		DB::rollback();

    		\Log::channel("coex")->info($e->getMessage());

    		return response()->json([			   
    			"status" => "Failed",
    			"message" => trans("global.something-wrong")
    		],500);
    	}    
    }

    public function update(ProfilUpdateRequest $request){
    	try{
            DB::beginTransaction();

            throw_if(!\Hash::check($request->password_confirm,auth()->user()->password),new \Exception(trans("profil.password-confirm-wrong")));

            auth()->user()->update($request->password ? $request->except("password_confirm") : $request->except("password","password_confirm"));            

            DB::commit();
            
            return response()->json([
                "status" => "Success",
                "message" => trans("profil.success-update")
            ]);
        }catch(\Exception $e){
            DB::rollback();

            \Log::channel("coex")->info($e->getMessage());

            return response()->json([
                 "status" => "Failed",
                 "message" => $e->getMessage() !== trans("profil.password-confirm-wrong") ? trans("global.something-wrong") : trans("profil.password-confirm-wrong")
            ],500);
        }
    }
}
