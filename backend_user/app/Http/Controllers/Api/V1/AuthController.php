<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\{
    SigninRequest,
    SignupRequest
};

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        try{
    	    throw_if(!User::create($request->validated()),new \Exception(trans("global.something-wrong")));
            
            return response()->json([
                "status" => "Success",
                "message" => trans("auth.success-signup")
            ],201);
        }catch(\Exception $e){
            \Log::channel("coex")->info($e->getMessage());

            return response()->json([
                "status" => "Failed",
                "message" => trans("global.something-wrong")
            ],500);
        }
    }

    public function signin(SigninRequest $request)
    {
        try{            
            throw_if(!$token = auth()->attempt($request->validated()),new \Exception(trans("auth.failed-signin")));
            
            return $this->respondWithToken($token);
        }catch(\Exception $e){
            \Log::channel("coex")->info($e->getMessage());

            return response()->json([
                "status" => "Failed",
                "error" => trans("auth.failed-signin")
            ],422);
        }
    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            "status" => "Success",
            'message' => trans("auth.success-logout")
        ]);
    }

    public function refresh()
    {
        try{            
            return $this->respondWithToken(auth()->refresh());
        }catch(\Exception $e){
            \Log::channel("coex")->info($e->getMessage());
            
            $messages = ["status" => "Failed"];

            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){            
                $messages['message'] = trans('auth.token-blacklist');
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {                
                $messages["message"] = trans('auth.token-refresh-invalid');
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {        
                $messages['message'] = trans('auth.token-invalid');                       
            }else{            
                $messages['message'] = trans('auth.token-not-found');       
            }

            return response()->json($messages,401);            
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            "status" => "Success",
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            "message" => trans("auth.success-signin")
        ]);
    }
}