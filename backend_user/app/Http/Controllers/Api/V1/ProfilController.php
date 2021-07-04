<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\{
	ProfilUploadRequest,
	ProfilUpdateRequest
};
use App\Helpers\FormatResponse;
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

            return FormatResponse::success(__("profil.success-upload"));    
    	}catch(\Exception $e){
    		DB::rollback();

    	   return FormatResponse::failed($e);
    	}    
    }

    public function update(ProfilUpdateRequest $request){
    	try{
            DB::beginTransaction();

            throw_if(!\Hash::check(
                $request->password_confirm,auth()->user()->password),
                new \Exception(trans("profil.password-confirm-wrong"),422)
            );

            auth()->user()->update(
                $request->password 
                    ? $request->except("password_confirm") 
                    : $request->except("password","password_confirm")
                );            

            DB::commit();
            
            return FormatResponse::success(__("profil.success-update"));            
        }catch(\Exception $e){
            DB::rollback();

            return FormatResponse::failed($e);
        }
    }
}
