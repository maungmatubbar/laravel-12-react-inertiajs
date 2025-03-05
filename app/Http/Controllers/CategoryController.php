<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request) {

        $query = Category::query();

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $categories = $query->paginate(5)->withQueryString(); 

        return Inertia::render('category/index', [
            'categories' => $categories,
            'filters' => $request->only('search', 'page'),
        ]);
    }

    public function create() {
        return Inertia::render('category/create');
    }

    public function store(Request $request) {
        $request->validate(['name' => 'required|string|max:255']);
        Category::create($request->all());
        return redirect()->route('categories.index');
    }

    public function edit(Category $category) {
        return Inertia::render('category/edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, Category $category) {
        $request->validate(['name' => 'required|string|max:255']);
        $category->update($request->all());
        return redirect()->route('categories.index');
    }

    public function destroy(Category $category) {
        $category->delete();
        return redirect()->back();
    }
}
