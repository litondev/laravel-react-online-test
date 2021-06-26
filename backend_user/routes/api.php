<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/",function(){
	return "hi api";
});

Route::group(["prefix" => "v1","namespace" => "Api\V1","middleware" => "api"],function(){
	Route::post("/signup","AuthController@signup")->name('signup');
	Route::post("/signin","AuthController@signin")->name("signin");

	Route::group(["middleware" => "jwt-refresh"],function(){
		Route::post("/refresh","AuthController@refresh")->name("refresh");
	});

	Route::group(["middleware" => "jwt"],function(){		
		Route::get("/home","HomeController@index")->name("home");
		Route::post("/logout","AuthController@logout")->name("logout");
		Route::get("/me","AuthController@me")->name("me");
	});
});