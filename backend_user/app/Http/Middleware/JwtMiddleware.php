<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {        
        try {            
            JWTAuth::parseToken()->authenticate();                
        } catch (\Exception $e) {  
            $messages = ["status" => "Failed"];

            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {                
                $messages['message'] = trans('auth.token-expired');
            }else if($e instanceof \Tymon\JWTAuth\Exceptions\TokenBlacklistedException){            
                $messages['message'] =  trans('auth.token-backlist');
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {        
                $messages['message'] = trans('auth.token-invalid');        
            } else{            
                $messages['message'] = trans('auth.token-not-found');
            }

            return response()->json($messages,401);
        }

        return $next($request);
    }
}