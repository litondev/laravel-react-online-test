<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Helpers\FormatResponse;
use App\Http\Requests\{
    SigninRequest,
    SignupRequest
};

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        try{
    	    throw_if(
                !User::create($request->validated()),
                new \Exception(__("global.something-wrong"))
            );
            
            return FormatResponse::success(__("auth.success-signup"));        
        }catch(\Exception $e){
            return FormatResponse::failed($e);         
        }
    }

    public function signin(SigninRequest $request)
    {
        try{            
            throw_if(
                !$token = auth()->attempt($request->validated()),
                new \Exception(__("auth.failed-signin"),422)
            );
            
            return $this->respondWithToken($token);
        }catch(\Exception $e){
            return FormatResponse::failed($e);   
        }
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return FormatResponse::success(__("auth.success-logout"));    
    }

    public function refresh()
    {
        try{            
            return $this->respondWithToken(auth()->refresh());
        }catch(\Exception $e){
            \Log::channel("coex")->info($e->getMessage());
            
            $messages = ["status" => "Failed"];

            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){            
                $messages['message'] = __('auth.token-blacklist');
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {                
                $messages["message"] = __('auth.token-refresh-invalid');
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {        
                $messages['message'] = __('auth.token-invalid');                       
            }else{            
                $messages['message'] = __('auth.token-not-found');       
            }

            return response()->json($messages,401);            
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            "status" => "Success",
            "message" => __("auth.success-signin"),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }
}