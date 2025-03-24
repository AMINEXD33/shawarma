<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CustomAuth;
use App\Http\Controllers\CustomDashboard;
use App\Http\Controllers\ApiController;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get("/customlogin", [CustomAuth::class, "loginForm"]);
Route::post("/customlogin", [CustomAuth::class, "login"])->name("customlogin");

Route::middleware(["auth"])->group(function () {
    Route::get("/manageProducts", [CustomDashboard::class,"manageProduct"])
    ->name("manageProducts");

    Route::get("/manageCategory", [CustomDashboard::class,"manageCategory"])
    ->name("manageCategory");
    
    Route::get("/manageIngredient", [CustomDashboard::class,"manageIngredient"])
    ->name("manageIngredient");

    Route::get("/managePromos", [CustomDashboard::class,"managePromos"])
    ->name("managePromos");

    Route::get("/addProduct", [CustomDashboard::class,"addProduct"])
    ->name("addProductPage");

    Route::get("/editPoduct", [CustomDashboard::class,"editPoduct"])
    ->name("editPoduct");

    Route::get("/editIngred", [CustomDashboard::class,"editIngred"])
    ->name("editIngred");

    Route::get("/addCategory", [CustomDashboard::class,"addCategory"])
    ->name("addCategory");

    Route::get("/editCat", [CustomDashboard::class,"editCat"])
    ->name("editCat");

    Route::get("/editPromos", [CustomDashboard::class,"editPromos"])
    ->name("editPromos");

    Route::get("/userPageSetting", [CustomDashboard::class,"userPageSetting"])
    ->name("userPageSetting");

});


Route::middleware(["auth"])->group(function () {
    Route::get("/API/getProducts", [ApiController::class, "getProducts"])->name("getProducts");
    Route::post("/API/deleteIngred", [ApiController::class,"deleteIngred"])->name("deleteIngred");
    Route::post("/API/searchPro", [ApiController::class, "searchProducts"])->name("searchProducts");
    Route::get("/API/getCategories", [ApiController::class,"getCategories"])->name("getCategories");
    Route::post("/API/productActiveSlides", [ApiController::class,"productActiveSlides"])->name("productActiveSlides");
    Route::post("/API/removeIngred", [ApiController::class,"removeIngred"])->name("removeIngred");
    Route::post("/API/deletePro", [ApiController::class,"deletePro"])->name("deletePro");
    Route::get("/API/getFormData", [ApiController::class,"getFormData"])->name("getFormData");
    Route::post("/API/addProduct", [ApiController::class,"addProduct"])->name("addProduct");
    Route::post("/API/updateProduct", [ApiController::class,"updateProduct"])->name("updateProduct");
    Route::get("/API/getIngred", [ApiController::class,"getIngred"])->name("getIngred");
    Route::post("/API/addIngred", [ApiController::class,"addIngred"])->name("addIngred");
    Route::post("/API/deleteIngredUnite", [ApiController::class,"deleteIngredUnite"])->name("deleteIngredUnite");
    Route::post("/API/updateIngred", [ApiController::class,"updateIngred"])->name("updateIngred");
    Route::post("/API/deleteCat", [ApiController::class,"deleteCat"])->name("deleteCat");
    Route::post("/API/addCategoryy", [ApiController::class,"addCategory"])->name("addCategoryy");
    Route::post("/API/updateCategory", [ApiController::class,"updateCategory"])->name("updateCategory");
    Route::get("/API/getPromos", [ApiController::class,"getPromos"])->name("getPromos");
    Route::post("/API/deletePromo", [ApiController::class,"deletePromo"])->name("deletePromo");
    Route::post("/API/createPromo", [ApiController::class,"createPromo"])->name("createPromo");
    Route::post("/API/updatePromo", [ApiController::class,"updatePromo"])->name("updatePromo");


})->name("endpoints");


require __DIR__.'/auth.php';
