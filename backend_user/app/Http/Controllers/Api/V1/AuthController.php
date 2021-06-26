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
    	    throw_if(!User::create($request->validated()),new \Exception("Something Wrong"));
            
            return response()->json([
                "status" => "Success",
                "message" => "Success signup"
            ],201);
        }catch(\Exception $e){
            \Log::channel("coex")->info($e->getMessage());

            return response()->json([
                "status" => "Failed",
                "message" => "Something wrong"
            ],500);
        }
    }

    public function signin(SigninRequest $request)
    {
        try{            
            throw_if(
                !$token = auth()->attempt($request->validated()),
                new \Exception("Nomor atau Password salah")
            );

            return $this->respondWithToken($token);
        }catch(\Exception $e){
            \Log::channel("coex")->info($e->getMessage());

            return response()->json([
                "status" => "Failed",
                "error" => "Nomor atau Password salah"
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
            'message' => 'Successfully logged out'
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
                $messages['message'] = 'Token is blacklisted';
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {                
                $messages["message"] = 'Token is expired';
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {        
                $messages['message'] = 'Token is invalid';                        
            }else{            
                $messages['message'] = 'Authorization token not found';            
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
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}