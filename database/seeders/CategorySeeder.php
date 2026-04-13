<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Video'],
            ['name' => 'Photo'],
            ['name' => 'Graphic'],
            ['name'=>'Audio']
        ];

        DB::table('categories')->insert($categories);
    }
    }
