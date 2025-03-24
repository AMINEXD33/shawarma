<?php

namespace App\Http\Controllers;

use App\Models\Ingred;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use DB;
use App\Models\Souce;
use App\Models\Boison;
use App\Models\Accompagnement;

use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function getProducts(Request $request){
        
        $products = Product::with("ingreds")->get();
        return response()->json(["products"=>$products]);
    }


    public function deleteIngred(Request $request){
        $data = $request->json()->all();
        if (!isset($data["productId"]) || !isset($data["ingredId"])){
            return response()->json([
                "err"=>"bad request"
            ], 402);
        }
        return response()->json([$data,$request->productId, $request->ingredId], 200);
    }


    public function searchProducts(Request $request){
        $search = $request->json()->get("search");
        $category = $request->json()->get("cat");

        if (!$search && !$category){
            $products = Product::with("ingreds")
            ->where("name", "like", "%".$search."%")
            ->get();
            return response()->json(["products"=>$products], 200);
        }

        if ($search && !$category){
            $products = Product::with("ingreds")
            ->where("name", "like", "%".$search."%")
            ->get();
            return response()->json(["products"=>$products], 200);
        }
        else if($category && !$search){
            $products = Product::with('categories')
            ->with("ingreds")
            ->whereHas('categories', function ($query) use ($category) {
                $query->where('category_id', "=", $category);
            })
            ->get();
            return response()->json(["products"=>$products], 200);
            
        }
        $products = Product::with('categories')
        ->with("ingreds")
        ->whereHas('categories', function ($query) use ($category) {
            $query->where('category_id', "=", $category);
        })
        ->where("name", "like", "%".$search."%")
        ->get();

        // return response()->json(["products"=>$products], 200);
        return response()->json([], 200);
    }


    public function getCategories(Request $request){
        return response()->json(["categories"=>Category::all()], 200);
    }


    public function productActiveSlides(Request $request){
        $slide1 = $request->json()->get("slide1");
        $slide2 = $request->json()->get("slide2");
        $productId = $request->json()->get("product_id");
        $updateList = [];
        $product = Product::find($productId);
        if (!$product){
            return response()->json(["err"=>"can't find product"], 402);
        }
        if ($slide1 === false || $slide1 === true || $slide1 === 0 || $slide1 === 1){
            $updateList["active_first_slide"] = (bool)$slide1;
        }
        if ($slide2 === false || $slide2 === true || $slide2 === 0 || $slide2 === 1){
            $updateList["active_second_slide"] = (bool)$slide2;
        }
        if (!empty($updateList)) {
            $product->forceFill($updateList)->save();
        }
        $product->refresh(); // Reload from DB
        return response()->json(["msg"=> $updateList, "pro"=>$product], 200);
    }

    public function removeIngred(Request $request){
        $productId = $request->json()->get("productId");
        $ingredId = $request->json()->get("ingredId");

        $product = Product::find($productId);
        if (!$product){
            return response()->json(["err"=> "can't find the product"], 404);
        }
        $ingred = Ingred::find($ingredId);
        if (!$ingred){
            return response()->json(["err"=> "can't find the ingrediant"], 404);
        }
        $record = DB::table("ingred_product")
        ->where("product_id", $productId)
        ->where("ingred_id", $ingredId);
        if (!$record){
            return response()->json(["err"=> "can't find a relation between the product and ingrediant"], 404);
        }
        $record->delete();
        return response()->json(["msg"=> "ok"], 200);

    }

    public function deletePro(Request $request){
        $productId = $request->json()->get("productId");

        $product = Product::find($productId);
        if (!$product){
            return response()->json(["err"=> "no product with such id"],404);
        }
        DB::table('souces_product')->where('product_id', $product->id)->delete();
        DB::table('accom_product')->where('product_id', $product->id)->delete();
        DB::table('boisons_product')->where('product_id', $product->id)->delete();
        $product->delete();
        return response()->json(["msg"=> "ok"], 200);
    }


    public function getFormData(Request $request){
        $categories = Category::all();
        $ingreds = Ingred::all();

        $souces = Souce::all();
        $drinks = Boison::all();
        $accom = Accompagnement::all();


        return response()->json([
            "cats"=>$categories, 
            "ingreds"=>$ingreds,
            "drinks"=>$drinks,
            "souces"=>$souces,
            "accom"=>$accom
        ], 200);
    }


    public function addProduct(Request $request){
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string',
            'delevery'      => 'required|numeric',
            'location'      => 'required|numeric',
            'title'         => 'required|string|max:255',
            'ingreds'       => 'required|json',
            'category'      => 'required|json',
            'drinks'        => 'nullable|json',
            'accomp'        => 'nullable|json',
            'souce'         => 'nullable|json',
            'menue'         => 'required|in:true,false',
            'active_first_slide'        => 'required|in:true,false',
            'active_second_slide'        => 'required|in:true,false',
            'photo'         => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);
    
        // If validation fails, return a JSON error response
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Store the validated data
        $validated = $validator->validated();
        
        $validated['active_first_slide'] = $validated['active_first_slide']=="true"?true:false;
        $validated['active_second_slide'] = $validated['active_second_slide']=="true"?true:false;
        // Store the file in storage/app/public/photos/
        $path = $request->file('photo')->store('photos', 'public');
        $validated["photo"] = $path;
    
        // Create the product
        $product = Product::create($validated);
        // accompagnement_commands

        // set the ingrediants
        $souces = json_decode($request->get("souce"));
        for ($i = 0; $i < count(value: $souces); $i++){
            DB::table("souces_product")->insert([
                "product_id"=> $product->id,
                "souces_id"=> $souces[$i]->id,
            ]);
        }

        $drinks = json_decode($request->get("drinks"));
        for ($i = 0; $i < count($drinks); $i++){
            DB::table("boisons_product")->insert([
                "product_id"=> $product->id,
                "boisons_id"=> $drinks[$i]->id,
            ]);
        }

        $accomp = json_decode($request->get("accomp"));
        for ($i = 0; $i < count($accomp); $i++){
            DB::table("accom_product")->insert([
                "product_id"=> $product->id,
                "accom_id"=> $accomp[$i]->id,
            ]);
        }

        $ingreds = json_decode($request->get("ingreds"));
        for ($i = 0; $i < count($ingreds); $i++) {
            DB::table("ingred_product")->insert([
                "product_id"=> $product->id,
                "ingred_id"=> $ingreds[$i]->id,
            ]);
        }
        $category = json_decode($request->get("category"));
        for ($i = 0; $i < count($category); $i++) {
            DB::table("category_product")->insert([
                "product_id"=> $product->id,
                "category_id"=> $category[$i]->id,
            ]);
        }
        
        return response()->json(["product" => $product, "examp"=>json_decode($request->get("drinks"))]);
    }


    public function updateProduct(Request $request){
        $product_id = $request->product_id;
        $product = Product::find($product_id);
        if (!$product) {
            return response()->json(["err"=> "no product with such id"],404);
        }
        $path = public_path($product->photo);
        if (file_exists($path)) {
            unlink($path);
        }
        // remove any dependances
        DB::table('ingred_product')->where('product_id', $product->id)->delete();
        DB::table('category_product')->where('product_id', $product->id)->delete();
        DB::table('souces_product')->where('product_id', $product->id)->delete();
        DB::table('accom_product')->where('product_id', $product->id)->delete();
        DB::table('boisons_product')->where('product_id', $product->id)->delete();






        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string',
            'delevery'      => 'required|numeric',
            'location'      => 'required|numeric',
            'title'         => 'required|string|max:255',
            'ingreds'       => 'required|json',
            'category'      => 'required|json',
            'drinks'        => 'nullable|json',
            'accomp'        => 'nullable|json',
            'souce'         => 'nullable|json',
            'menue'         => 'required|in:true,false',
            'active_first_slide'        => 'required|in:true,false',
            'active_second_slide'        => 'required|in:true,false',
            'photo'         => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
        ]);
    
        // If validation fails, return a JSON error response
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Store the validated data
        $validated = $validator->validated();
        
        $validated['active_first_slide'] = $validated['active_first_slide']=="true"?true:false;
        $validated['active_second_slide'] = $validated['active_second_slide']=="true"?true:false;
        // Store the file in storage/app/public/photos/
        $path = $request->file('photo')->store('photos', 'public');
        $validated["photo"] = $path;
    
        // update the product
        $product->update($validated);
        // accompagnement_commands

        // set the ingrediants
        $souces = json_decode($request->get("souce"));
        for ($i = 0; $i < count(value: $souces); $i++){
            DB::table("souces_product")->insert([
                "product_id"=> $product->id,
                "souces_id"=> $souces[$i]->id,
            ]);
        }

        $drinks = json_decode($request->get("drinks"));
        for ($i = 0; $i < count($drinks); $i++){
            DB::table("boisons_product")->insert([
                "product_id"=> $product->id,
                "boisons_id"=> $drinks[$i]->id,
            ]);
        }

        $accomp = json_decode($request->get("accomp"));
        for ($i = 0; $i < count($accomp); $i++){
            DB::table("accom_product")->insert([
                "product_id"=> $product->id,
                "accom_id"=> $accomp[$i]->id,
            ]);
        }

        $ingreds = json_decode($request->get("ingreds"));
        for ($i = 0; $i < count($ingreds); $i++) {
            DB::table("ingred_product")->insert([
                "product_id"=> $product->id,
                "ingred_id"=> $ingreds[$i]->id,
            ]);
        }
        $category = json_decode($request->get("category"));
        for ($i = 0; $i < count($category); $i++) {
            DB::table("category_product")->insert([
                "product_id"=> $product->id,
                "category_id"=> $category[$i]->id,
            ]);
        }

        return response()->json(["product" => $product]); 
    }


    public function getIngred(Product $product){

        $ingreds = Ingred::all();
        return response()->json(["ingreds"=> $ingreds]);
    }


    public function addIngred(Request $request){
        $en = $request->json("en");
        $fr = $request->json("fr");
        $ni = $request->json("ni");
        if (!$en || ! $fr || ! $ni) {
            return response()->json(["err"=>"bad args"], 401);
        }

        $engred = Ingred::create([
            "name_fr"=>$fr,
            "name_en"=>$en,
            "name_ni"=>$ni
        ]);

        if (! $engred) {
            return response()->json(["err"=> "can't create engrediant"],401);
        }

        return response()->json(["ingred"=> $engred], 200);
    }


    public function deleteIngredUnite(Request $request){
        $id = $request->json("id");
        $ingred = Ingred::find($id);
        if (!$ingred) {
            return response()->json(["err"=> "can't find the ingrediant"],404);
        }

        $ingred->delete();
        return response()->json(["msg"=> "deleted"],200);
    }

    public function updateIngred(Request $request){
        $id = $request->json("id");
        $en = $request->json("en");
        $fr = $request->json("fr");
        $ni = $request->json("ni");

        if (!$en || ! $fr || ! $ni) {
            return response()->json(["err"=> "can't update ingrediant"],404);
        }
        $ingred = Ingred::find($id);
        if (!$ingred) {
            return response()->json(["err"=> "can't find ingrediant"],404);
        }

        $ingred->update([
            "name_fr"=>$fr,
            "name_en"=>$en,
            "name_ni"=>$ni
        ]);
        return response()->json(["msg"=> "updated"],200);
    }

    public function deleteCat(Request $request){
        $id = $request->json("id");
        $cat = Category::find($id);
        if (!$cat) {
            return response()->json(["err"=> "can't find category"],404);
        }
        $cat->delete();
        return response()->json(["msg"=> "deleted"],200);
    }


    public function addCategory(Request $request){
        $name = $request->json("name");
        $desc = $request->json("desc");
        $meta = $request->json("meta");

        if (!$name || !$desc || !$meta) {
            return response()->json(["err"=> "bad request"],404);
        }

        $cat = Category::create([
            "name"=> $name,
            "description"=> $desc,
            "metatitle"=> $meta
        ]);

        return response()->json(["msg"=> $cat],200);
    }


    public function updateCategory(Request $request){
        $id = $request->json("id");
        $name = $request->json("name");
        $desc = $request->json("desc");
        $meta = $request->json("meta");
        if (!$id || !$name || !$desc || !$meta) {
            return response()->json(["err"=> "bad request"],404);
        }
        $cat = Category::find($id);
        if (!$cat) {
            return response()->json(["err"=> "can't find category"],404);
        }
        $cat->update([
            "name"=> $name,
            "description"=> $desc,
            "metatitle"=> $meta
        ]);
        return response()->json(["msg"=> $cat],200);
    }
}
