<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;

use Inertia\Response;
class CustomAuth extends Controller
{
    public function loginForm(){
        return Inertia::render("Auth2/Login");
    }

    public function login(LoginRequest $request){
        
        if (Auth::attempt(["email"=>$request->email, "password"=>$request->password])){
            $request->authenticate();
            $request->session()->regenerate();
            return response()->json(["mssg"=>"ok"], 200);
        }
        return response()->json(["err"=>"wrong credentials"], 404);
    }
}
