<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Ingred;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use DB;
class CustomDashboard extends Controller
{
    



    public function manageProduct(Request $request){
        
        return Inertia::render("mainlayout", [
            "targetPage"=>1
        ]);
    }

    public function manageCategory(Request $request){
        return Inertia::render("mainlayout", [
            "targetPage"=>2
        ]);
    }

    public function manageIngredient(Request $request){
        return Inertia::render("mainlayout", [
            "targetPage"=>3
        ]);
    }

    public function managePromos(Request $request){
        return Inertia::render("mainlayout", [
            "targetPage"=>4
        ]);
    }

    public function addProduct (Request $request){
        return Inertia::render("mainlayout", [
            "targetPage"=>5
        ]);
    }

    public function editPoduct(Request $request){
        $product_id = $request->product_id;
        $pr = Product::find($product_id);
        if (!$pr){
            return Inertia::render("mainlayout", [
                "targetPage"=>1
            ]);
        }
        $product = Product::with("ingreds")->find($product_id);
        
        $cats = DB::table("category_product")
        ->where("product_id", $product_id)
        ->join("categories","categories.id","=","category_id")
        ->get();

        $souce = DB::table("souces_product")
        ->where("product_id", $product_id)
        ->join("souces", "souces.id" ,"=","souces_product.souces_id")
        ->get(["souces.id", "name", "price"]);

        $coms = DB::table("accom_product")
        ->where("product_id", $product_id)
        ->join("accompagnements", "accompagnements.id" ,"=","accom_id")
        ->get(["accompagnements.id", "name", "price"]);

        $drinks = DB::table("boisons_product")
        ->where("product_id", $product_id)
        ->join("boisons", "boisons.id" ,"=","boisons_id")
        ->get(["boisons.id", "name", "price"]);


        return Inertia::render("mainlayout", [
            "targetPage"=>6,
            "data"=>[
                "product"=>$product,
                "souce"=>$souce,
                "drinks"=>$drinks,
                "coms"=>$coms,
                "cats"=>$cats
            ]
        ]);
    }


    public function editIngred(Request $request){
        $ingred_id = $request->id;
        if (!$ingred_id){
            return Inertia::render("mainlayout", [
                "targetPage"=>1
            ]);
        }
        $ingreds = Ingred::find($ingred_id);
        if (! $ingreds){
            return Inertia::render("mainlayout", [
                "targetPage"=>1
            ]);
        }


        return Inertia::render("mainlayout", [
            "targetPage"=>7,
            "data"=>[
                "ingreds"=>$ingreds,
            ]
        ]);
    }

    public function addCategory(Request $request){
        return Inertia::render("mainlayout", [
            "targetPage"=>8,
        ]);
    }

    public function editCat(Request $request){
        $cat_id = $request->cat_id;
        if (!$cat_id){
            return Inertia::render("mainlayout", [
                "targetPage"=>2
            ]);
        }
        $cat = Category::find($cat_id);
        if (! $cat){
            return Inertia::render("mainlayout", [
                "targetPage"=>2
            ]);
        }

        return Inertia::render("mainlayout", [
            "targetPage"=>9,
            "data"=>[
                "category"=>$cat
            ]
        ]);
    }

    public function editPromos(Request $request){
        $id = $request->id;
        if (!$id){
            return Inertia::render("mainlayout", [
                "targetPage"=>4
            ]);
        }
        $promo = Promo::find($id);
        if (! $promo){
            return Inertia::render("mainlayout", [
                "targetPage"=>4
            ]);
        }

        return Inertia::render("mainlayout", [
            "targetPage"=>10,
            "data"=>[
                "promo"=>$promo
            ]
        ]);
    }

    public function userPageSetting(Request $request){
        return Inertia::render("mainlayout", [
            "targetPage"=>11
        ]);
    }

}
